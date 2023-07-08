import type { WorkspacePackage } from '@alexaegis/workspace-tools';
import { afterEach, describe, expect, it, vi } from 'vitest';

const setOutputMock = vi.hoisted(() => vi.fn());
const infoMock = vi.hoisted(() => vi.fn());
const setFailedMock = vi.hoisted(() => vi.fn());
const getInputMock = vi.hoisted(() => vi.fn());

const collectWorkspacePackagesMock = vi.hoisted(() =>
	vi.fn((): WorkspacePackage[] => {
		return [
			{
				packageJson: { name: 'foo' },
				packageJsonPath: '/foo/bar/package/foo/package.json',
				packageKind: 'regular',
				packagePath: '/foo/bar/package/foo',
				packagePathFromRootPackage: '../../',
			},
			{
				packageJson: { name: 'bar' },
				packageJsonPath: '/foo/bar/package/bar/package.json',
				packageKind: 'regular',
				packagePath: '/foo/bar/package/bar',
				packagePathFromRootPackage: '../../',
			},
		];
	}),
);

vi.mock('@actions/core', () => {
	return {
		endGroup: vi.fn(),
		info: infoMock,
		startGroup: vi.fn(),
		setOutput: setOutputMock,
		setFailed: setFailedMock,
		getInput: getInputMock,
	};
});

vi.mock('@alexaegis/workspace-tools', () => {
	return {
		collectWorkspacePackages: collectWorkspacePackagesMock,
	};
});

describe.skip('collect-public-packages', () => {
	afterEach(() => {
		vi.clearAllMocks();
		vi.resetModules();
	});

	it('should be able to collect all public packages', async () => {
		expect(setOutputMock).not.toHaveBeenCalled();
		await import('./index.js');
		expect(setOutputMock).toHaveBeenCalledTimes(1);
		expect(setFailedMock).not.toHaveBeenCalled();
		expect(setOutputMock).toHaveBeenCalledWith('publicPackageNames', ['foo', 'bar']);
	});

	it('should be able to report that there are no public packages present', async () => {
		collectWorkspacePackagesMock.mockReturnValueOnce([]);
		expect(setOutputMock).not.toHaveBeenCalled();
		await import('./index.js');
		expect(infoMock).toHaveBeenCalledTimes(1);
		expect(setFailedMock).not.toHaveBeenCalled();
		expect(setOutputMock).toHaveBeenCalledTimes(0);
		expect(setOutputMock).not.toHaveBeenCalled();
	});

	it('should be able to report an error if something happens during collection', async () => {
		collectWorkspacePackagesMock.mockRejectedValueOnce(new Error('error'));
		expect(setOutputMock).not.toHaveBeenCalled();
		await import('./index.js');
		expect(infoMock).not.toHaveBeenCalled();
		expect(setFailedMock).toHaveBeenCalledTimes(1);
		expect(setOutputMock).toHaveBeenCalledTimes(0);
		expect(setOutputMock).not.toHaveBeenCalled();
	});

	it('should be able to report an unkown error if something happens during collection', async () => {
		collectWorkspacePackagesMock.mockRejectedValueOnce('error');
		expect(setOutputMock).not.toHaveBeenCalled();
		await import('./index.js');
		expect(infoMock).not.toHaveBeenCalled();
		expect(setFailedMock).toHaveBeenCalledTimes(1);
		expect(setOutputMock).toHaveBeenCalledTimes(0);
		expect(setOutputMock).not.toHaveBeenCalled();
	});
});
