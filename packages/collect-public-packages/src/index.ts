import { endGroup, error, getInput, info, setFailed, setOutput, startGroup } from '@actions/core';
import { exec } from '@actions/exec';
import {
	PackageJson,
	WorkspacePackage,
	collectWorkspacePackages,
	getPackageJsonTemplateVariables,
} from '@alexaegis/workspace-tools';

// Something is using crypto probably through fs and it fails on gh-actions
import randomPoly from 'polyfill-crypto.getrandomvalues';
try {
	(globalThis as unknown as { crypto: unknown }).crypto = {
		getRandomValues: randomPoly as unknown,
	};
} catch {
	console.log('cant polyfill getRandomValues');
}

interface PackageIsPublishedResult {
	packageName: string;
	packageNameWithoutOrg: string;
	packageNameOnlyOrg: string;
	packageVersion: string;
	packagePathFromRootPackage: string;
	isPublished: boolean | undefined;
}

interface PackageIsPublishedRejectionResult {
	workspacePackage: WorkspacePackage;
	message: string;
}

class PackageCheckError extends Error implements PackageIsPublishedRejectionResult {
	workspacePackage: WorkspacePackage;

	constructor(reason: PackageIsPublishedRejectionResult) {
		super(reason.message);
		this.workspacePackage = reason.workspacePackage;
	}
}

export const getPackageMetadata = async (
	workspacePackage: WorkspacePackage,
	registry: string,
	checkIfPublished: boolean
): Promise<PackageIsPublishedResult> => {
	let registryArgument = '';
	if (registry) {
		registryArgument = ` --registry ${registry}`;
	}

	const packageName = workspacePackage.packageJson.name;
	const packageVersion = workspacePackage.packageJson.version;

	if (!packageName && !packageVersion) {
		throw new PackageCheckError({
			workspacePackage,
			message: `both name and version fields are empty in package.json at ${workspacePackage.packagePath}`,
		} as PackageIsPublishedRejectionResult);
	} else if (!packageName) {
		throw new PackageCheckError({
			workspacePackage,
			message: `name field is empty in package.json at ${workspacePackage.packagePath}`,
		} as PackageIsPublishedRejectionResult);
	} else if (!packageVersion) {
		throw new PackageCheckError({
			workspacePackage,
			message: `version field is empty in package.json at ${workspacePackage.packagePath}`,
		} as PackageIsPublishedRejectionResult);
	}

	const variables = getPackageJsonTemplateVariables(workspacePackage.packageJson);

	let code: number | undefined = undefined;

	if (checkIfPublished) {
		try {
			code = await exec(`npm view ${packageName}@${packageVersion}${registryArgument}`);
		} catch {
			code = 1;
		}
	}

	return {
		packageName,
		packageVersion,
		packageNameOnlyOrg: variables.packageOrg,
		packageNameWithoutOrg: variables.packageNameWithoutOrg,
		packagePathFromRootPackage: workspacePackage.packagePathFromRootPackage,
		isPublished: typeof code === 'number' ? code === 0 : undefined,
	};
};

const changeShallowCasingFromCamelToSnake = (o: PackageIsPublishedResult) => {
	return Object.fromEntries(
		Object.entries(o).map(([key, value]) => [
			key.replaceAll(/[A-Z]/g, (c) => {
				return '_' + c.toLowerCase();
			}),
			value,
		])
	);
};

void (async () => {
	const registryOption = getInput('registry');
	const onlyPublicOption = (getInput('only-public') || 'true') === 'true';
	const checkIfPublishedOption = (getInput('check-if-published') || 'true') === 'true';
	const skipRootPackageIfMonorepoOption =
		(getInput('skip-root-package-if-monorepo') || 'true') === 'true';

	info('start package collection with the following options:');
	info(`- registry: ${registryOption}`);
	info(`- only-public: ${JSON.stringify(onlyPublicOption)}`);
	info(`- check-if-published: ${JSON.stringify(checkIfPublishedOption)}`);
	info(`- skip-root-package-if-monorepo: ${JSON.stringify(skipRootPackageIfMonorepoOption)}`);

	const matcher: PackageJson = {};
	if (onlyPublicOption) {
		matcher.private = false; // A package is public when its explicitly not private.
	}
	try {
		let workspacePackages = await collectWorkspacePackages({
			skipWorkspaceRoot: skipRootPackageIfMonorepoOption, // Will let single package repos through, in monorepos, you don't want to publish the workspace itself
			packageJsonMatcher: matcher,
		});

		workspacePackages = workspacePackages.filter((pkg) => !!pkg.packageJson.name);

		startGroup('npm output:');
		const packagePublishInformation = await Promise.allSettled(
			workspacePackages.map((workspacePackage) =>
				getPackageMetadata(workspacePackage, registryOption, checkIfPublishedOption)
			)
		);
		endGroup();

		const rejectedChecks = packagePublishInformation.filter(
			(result): result is PromiseRejectedResult => result.status === 'rejected'
		);

		if (rejectedChecks.length > 0) {
			error('failed to view the following package versions in the npm registry');
			for (const rejection of rejectedChecks) {
				error((rejection.reason as PackageCheckError).message);
			}
		}

		const fulfilledChecks = packagePublishInformation.filter(
			(result): result is PromiseFulfilledResult<PackageIsPublishedResult> =>
				result.status === 'fulfilled'
		);

		const alreadyPublishedPackages = checkIfPublishedOption
			? fulfilledChecks
					.filter((result) => result.value.isPublished)
					.map((result) => result.value)
			: [];

		const nonPublishedPackages = checkIfPublishedOption
			? fulfilledChecks
					.filter((result) => !result.value.isPublished)
					.map((result) => result.value)
			: [];

		if (workspacePackages.length > 0) {
			startGroup('packages found:');
			for (const publicWorkspacePackage of workspacePackages) {
				// Already filtered out
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				info(publicWorkspacePackage.packageJson.name!);
			}
			endGroup();
			setOutput(
				'packages',
				fulfilledChecks.map((result) => changeShallowCasingFromCamelToSnake(result.value))
			);
			const publicPackageNames = workspacePackages.map(
				(workspacePackage) => workspacePackage.packageJson.name
			);
			setOutput('public_package_names', publicPackageNames);

			if (alreadyPublishedPackages.length > 0) {
				startGroup('already_published_packages found:');
				for (const result of alreadyPublishedPackages) {
					info(`${result.packageName}@${result.packageVersion}`);
				}
				endGroup();
				setOutput(
					'already_published_packages',
					alreadyPublishedPackages.map((result) =>
						changeShallowCasingFromCamelToSnake(result)
					)
				);
				setOutput(
					'already_published_package_names',
					alreadyPublishedPackages.map((pkg) => pkg.packageName)
				);
			} else if (checkIfPublishedOption) {
				info('no already_published_packages were found!');
			} else {
				info('no already_published_packages because check-if-published is off');
			}

			if (nonPublishedPackages.length > 0) {
				startGroup('non_published_packages found:');
				for (const result of nonPublishedPackages) {
					info(`${result.packageName}@${result.packageVersion}`);
				}
				endGroup();
				setOutput(
					'non_published_packages',
					nonPublishedPackages.map((result) =>
						changeShallowCasingFromCamelToSnake(result)
					)
				);
				setOutput(
					'non_published_package_names',
					nonPublishedPackages.map((pkg) => pkg.packageName)
				);
			} else if (checkIfPublishedOption) {
				info('no non_published_packages were found!');
			} else {
				info('no non_published_packages because check-if-published is off');
			}
		} else {
			info('no packages found within this repository!');
		}
	} catch (error_) {
		if (error_ instanceof Error) {
			setFailed('error happened while interpreting the workspace: ' + error_.message);
		} else {
			setFailed('unknown error happened while interpreting the workspace!');
		}
	}
})(); // node16 doesn't support top-level await
