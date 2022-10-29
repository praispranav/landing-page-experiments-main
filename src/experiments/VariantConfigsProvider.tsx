import {
    VariantLocalElements,
    VariantLocalImages,
    VariantLocalLinks,
    VariantLocalLists,
    VariantLocalStrings,
} from '@hooks/resourceStrings/Types';
import { FC, useReducer } from 'react';

import { ILocalVariantConfig } from './IVariantConfig';
import { VariantConfigsContext } from './VariantConfigsContext';

export type ConfigReducerAction =
    | { payload?: VariantLocalImages; type: 'Images' }
    | { payload?: VariantLocalLinks; type: 'Links' }
    | { payload?: VariantLocalLists; type: 'Lists' }
    | { payload?: VariantLocalElements; type: 'Elements' }
    | { payload?: VariantLocalStrings; type: 'Strings' };

const initialState: ILocalVariantConfig = {
    images: {},
    links: {},
    lists: {},
    strings: {},
    elements: {},
};

function configReducer(
    state: ILocalVariantConfig,
    { type, payload = {} }: ConfigReducerAction,
): ILocalVariantConfig {
    switch (type) {
        case 'Images':
            return { ...state, images: payload as VariantLocalImages };

        case 'Links':
            return { ...state, links: payload as VariantLocalLinks };

        case 'Lists':
            return { ...state, lists: payload as VariantLocalLists };

        case 'Strings':
            return { ...state, strings: payload as VariantLocalStrings };

        case 'Elements':
            return { ...state, elements: payload as VariantLocalElements };
    }
}

type OverrideConfigFn = (originalConfig: ILocalVariantConfig) => ILocalVariantConfig;
export const VariantConfigsProvider: FC<{ overrideConfigFn?: OverrideConfigFn }> = ({
    children,
    overrideConfigFn,
}) => {
    const [config, dispatch] = useReducer(configReducer, initialState);
    const mergedConfig = overrideConfigFn ? overrideConfigFn(config) : config;

    return (
        <VariantConfigsContext.Provider value={{ config: mergedConfig, dispatch }}>
            {children}
        </VariantConfigsContext.Provider>
    );
};
