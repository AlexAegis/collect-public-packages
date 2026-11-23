import type { WorkspacePackage } from '@alexaegis/workspace-tools';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const setOutputMock = vi.hoisted(() => vi.fn());
const infoMock = vi.hoisted(() => vi.fn());
const errorMock = vi.hoisted(() => vi.fn());
const setFailedMock = vi.hoisted(() => vi.fn());
const getInputMock = vi.hoisted(() => vi.fn());
const execMock = vi.hoisted(() => vi.fn());
const collectWorkspacePackagesMock = vi.hoisted(() => vi.fn());

vi.mock('@actions/core', () => {
	return {
		endGroup: vi.fn(),
		error: errorMock,
		getInput: getInputMock,
		info: infoMock,
		setFailed: setFailedMock,
		setOutput: setOutputMock,
		startGroup: vi.fn(),
	};
});

vi.mock('@actions/exec', () => {
	return {
		exec: execMock,
	};
});

vi.mock('@alexaegis/workspace-tools', async (importOriginal) => {
	const original = await importOriginal<typeof import('@alexaegis/workspace-tools')>();
	return {
		...original,
		collectWorkspacePackages: collectWorkspacePackagesMock,
	};
});

const workspacePackage = (name?: string, version?: string): WorkspacePackage => {
	const packagePath = `/repo/packages/${name?.split('/').at(-1) ?? 'unnamed'}`;
	return {
		packageJson: {
			private: false,
			...(name === undefined ? {} : { name }),
			...(version === undefined ? {} : { version }),
		},
		packageJsonPath: `${packagePath}/package.json`,
		packageKind: 'regular',
		packagePath,
		packagePathFromRootPackage: packagePath.replace('/repo/', ''),
	};
};

const runAction = async (): Promise<void> => {
	await import('./index.js');
	await new Promise((resolve) => setTimeout(resolve, 0));
};

const outputsByName = (): Record<string, unknown> => {
	return Object.fromEntries(setOutputMock.mock.calls as [string, unknown][]);
};

beforeEach(() => {
	getInputMock.mockReturnValue('');
	execMock.mockResolvedValue(0);
	collectWorkspacePackagesMock.mockResolvedValue([]);
});

afterEach(() => {
	vi.resetAllMocks();
	vi.resetModules();
});

describe('collect-public-packages', () => {
	it('should collect only packages that are explicitly not private, without the workspace root', async () => {
		await runAction();
		expect(collectWorkspacePackagesMock).toHaveBeenCalledWith({
			skipWorkspaceRoot: true,
			packageJsonMatcher: { private: false },
		});
	});

	it('should split the public packages into published and non-published ones', async () => {
		collectWorkspacePackagesMock.mockResolvedValue([
			workspacePackage('@org/published', '1.0.0'),
			workspacePackage('unpublished', '2.1.0'),
		]);
		execMock.mockImplementation((command: string) =>
			command === 'npm view @org/published@1.0.0'
				? Promise.resolve(0)
				: Promise.reject(new Error(`The process 'npm' failed with exit code 1`)),
		);

		await runAction();

		expect(setFailedMock).not.toHaveBeenCalled();
		expect(execMock).toHaveBeenCalledWith('npm view @org/published@1.0.0');
		expect(execMock).toHaveBeenCalledWith('npm view unpublished@2.1.0');
		const published = {
			package_name: '@org/published',
			package_version: '1.0.0',
			package_name_only_org: '@org',
			package_name_without_org: 'published',
			package_path_from_root_package: 'packages/published',
			is_published: true,
		};
		const unpublished = {
			package_name: 'unpublished',
			package_version: '2.1.0',
			package_name_only_org: '',
			package_name_without_org: 'unpublished',
			package_path_from_root_package: 'packages/unpublished',
			is_published: false,
		};
		expect(outputsByName()).toEqual({
			public_packages: [published, unpublished],
			public_package_names: ['@org/published', 'unpublished'],
			already_published_packages: [published],
			already_published_package_names: ['@org/published'],
			non_published_packages: [unpublished],
			non_published_package_names: ['unpublished'],
		});
	});

	it('should pass the registry input to npm view', async () => {
		getInputMock.mockReturnValue('https://registry.example.test');
		collectWorkspacePackagesMock.mockResolvedValue([workspacePackage('foo', '1.0.0')]);

		await runAction();

		expect(getInputMock).toHaveBeenCalledWith('registry');
		expect(execMock).toHaveBeenCalledWith(
			'npm view foo@1.0.0 --registry https://registry.example.test',
		);
	});

	it('should set no non-published outputs when every package is published', async () => {
		collectWorkspacePackagesMock.mockResolvedValue([
			workspacePackage('foo', '1.0.0'),
			workspacePackage('bar', '1.0.0'),
		]);

		await runAction();

		expect(setFailedMock).not.toHaveBeenCalled();
		expect(outputsByName()['already_published_package_names']).toEqual(['foo', 'bar']);
		expect(outputsByName()).not.toHaveProperty('non_published_packages');
		expect(outputsByName()).not.toHaveProperty('non_published_package_names');
		expect(infoMock).toHaveBeenCalledWith('no non_published_packages were found!');
	});

	it('should count a package as not published when npm view throws', async () => {
		collectWorkspacePackagesMock.mockResolvedValue([workspacePackage('foo', '1.0.0')]);
		execMock.mockRejectedValue(new Error('npm missing'));

		await runAction();

		expect(setFailedMock).not.toHaveBeenCalled();
		expect(outputsByName()['non_published_package_names']).toEqual(['foo']);
		expect(outputsByName()).not.toHaveProperty('already_published_packages');
		expect(infoMock).toHaveBeenCalledWith('no already_published_packages were found!');
	});

	it('should skip packages without a name', async () => {
		collectWorkspacePackagesMock.mockResolvedValue([
			workspacePackage(undefined, '1.0.0'),
			workspacePackage('foo', '1.0.0'),
		]);

		await runAction();

		expect(execMock).toHaveBeenCalledTimes(1);
		expect(outputsByName()['public_package_names']).toEqual(['foo']);
	});

	it('should report a package without a version and leave it out of the checked packages', async () => {
		collectWorkspacePackagesMock.mockResolvedValue([
			workspacePackage('foo', '1.0.0'),
			workspacePackage('versionless'),
		]);

		await runAction();

		expect(errorMock).toHaveBeenCalledWith(
			'version field is empty in package.json at /repo/packages/versionless',
		);
		expect(setFailedMock).not.toHaveBeenCalled();
		expect(outputsByName()['public_packages']).toEqual([
			expect.objectContaining({ package_name: 'foo' }),
		]);
		expect(outputsByName()['public_package_names']).toEqual(['foo', 'versionless']);
	});

	it('should set no output when the repository has no public packages', async () => {
		await runAction();

		expect(infoMock).toHaveBeenCalledWith('no packages found within this repository!');
		expect(setOutputMock).not.toHaveBeenCalled();
		expect(setFailedMock).not.toHaveBeenCalled();
	});

	it('should fail with the message of an error thrown during collection', async () => {
		collectWorkspacePackagesMock.mockRejectedValue(new Error('broken workspace'));

		await runAction();

		expect(setFailedMock).toHaveBeenCalledWith(
			'error happened while interpreting the workspace: broken workspace',
		);
		expect(setOutputMock).not.toHaveBeenCalled();
	});

	it('should fail with a generic message when collection rejects with a non-error', async () => {
		collectWorkspacePackagesMock.mockRejectedValue('broken workspace');

		await runAction();

		expect(setFailedMock).toHaveBeenCalledWith(
			'unknown error happened while interpreting the workspace!',
		);
		expect(setOutputMock).not.toHaveBeenCalled();
	});
});

describe('getPackageMetadata', () => {
	it.each([
		[undefined, undefined, 'both name and version fields are empty'],
		[undefined, '1.0.0', 'name field is empty'],
		['foo', undefined, 'version field is empty'],
	])('should reject a package with name %s and version %s', async (name, version, message) => {
		const { getPackageMetadata } = await import('./index.js');
		await expect(getPackageMetadata(workspacePackage(name, version), '')).rejects.toThrow(
			message,
		);
		expect(execMock).not.toHaveBeenCalled();
	});
});
