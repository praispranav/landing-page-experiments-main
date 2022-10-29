import { IServiceDictionary } from 'types/dazn/StartupData';

export const getServiceVersions = <S extends keyof IServiceDictionary>(
    name: S,
): IServiceDictionary[S] => window.dazn.startupData.ServiceDictionary[name];

export const getServicePath = (name: keyof IServiceDictionary, versionNumber: number): URL => {
    const { Versions } = getServiceVersions(name);
    const { ServicePath } = Versions[`v${versionNumber}`];

    return new URL(ServicePath);
};
