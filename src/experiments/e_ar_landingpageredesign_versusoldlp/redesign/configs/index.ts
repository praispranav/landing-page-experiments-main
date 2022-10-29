import { IVariantConfig } from '@experiments/IVariantConfig';
import { useShouldDisplayPPV } from '@hooks/dazn/offer/UseAddon';
import { useVariantConfig } from '@hooks/utils/UseLocalisedConfig';
import { getCountry } from '@utils/dazn/Region';
import { mergeDeepRight } from 'ramda';
import { useQuery } from 'react-query';

import { AvailableRegions } from '../../ExperimentConfig';

const getPPVConfig = (): Promise<IVariantConfig> =>
    import(
        /* webpackExclude: /common/ */
        /* webpackChunkName: "variant-config-ppv" */
        /* webpackExports: ["default"] */
        './PPV'
    ).then((module) => module.default);

const getRegionConfig = (regionName: string): Promise<IVariantConfig> =>
    import(
        /* webpackExclude: /common/ */
        /* webpackChunkName: "variant-config-[request]" */
        /* webpackExports: ["default"] */
        `./${regionName}.ts`
    ).then((module) => module.default);

const configs: Record<AvailableRegions, () => Promise<IVariantConfig>> = {
    [AvailableRegions.US]: () => getRegionConfig('US'),
    [AvailableRegions.DE]: () => getRegionConfig('DE'),
    [AvailableRegions.ES]: () => getRegionConfig('ES'),
    [AvailableRegions.AT]: () => getRegionConfig('AT'),
    [AvailableRegions.JP]: () => getRegionConfig('JP'),
    [AvailableRegions.CA]: () => getRegionConfig('CA'),
    [AvailableRegions.IT]: () => getRegionConfig('IT'),
    [AvailableRegions.BR]: () => getRegionConfig('BR'),
    [AvailableRegions.GLOBAL]: () => getRegionConfig('Global'),
    [AvailableRegions.CH]: () => getRegionConfig('CH'),
    [AvailableRegions.GB]: () => getRegionConfig('GB'),
    [AvailableRegions.IE]: () => getRegionConfig('IE'),
    [AvailableRegions.AU]: () => getRegionConfig('AU'),
    [AvailableRegions.NZ]: () => getRegionConfig('NZ'),
};

export const useLocalisedConfig = (): void => {
    const country = getCountry() as AvailableRegions;
    const isPPVEnabled = useShouldDisplayPPV();

    const { data } = useQuery(
        `redesign-config-${country}`,
        () => {
            const imports = [configs[country]()];

            if (isPPVEnabled) {
                imports.push(getPPVConfig());
            }

            return Promise.all(imports).then((configsImported) =>
                configsImported.reduce<IVariantConfig>(mergeDeepRight, {
                    stringsConfig: {},
                    linksConfig: {},
                    imagesConfig: {},
                    listsConfig: {},
                    elementsConfig: {},
                }),
            );
        },
        {
            suspense: true,
        },
    );

    useVariantConfig(data);
};

export default configs;
