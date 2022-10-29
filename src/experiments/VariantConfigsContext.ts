import React, { Dispatch } from 'react';

import { ILocalVariantConfig } from './IVariantConfig';
import { ConfigReducerAction } from './VariantConfigsProvider';

interface IVariantConfigsContext {
    dispatch: Dispatch<ConfigReducerAction>;
    config: ILocalVariantConfig;
}

const initialConfig = {
    strings: {},
    links: {},
    images: {},
    lists: {},
    elements: {},
};

export const VariantConfigsContext = React.createContext<IVariantConfigsContext>({
    dispatch: () => null,
    config: initialConfig,
});
