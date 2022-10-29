import { createLabels, LabelsInstance } from '@dazn/fe-labels';
import { LabelsProvider } from '@dazn/fe-labels-react';
import { ThemeProvider, themes } from '@dazn/goat-design-system';
import { ILocalVariantConfig } from '@experiments/IVariantConfig';
import { VariantConfigsContext } from '@experiments/VariantConfigsContext';
import { render, RenderOptions, RenderResult } from '@testing-library/react';
import { RenderHookOptions } from '@testing-library/react-hooks';
import { getResourcesDictionary } from '@utils/dazn/ResourcesDictionary';
import { FC, ReactElement } from 'react';
import { IResourceStringsData } from 'types/dazn/ResourceStrings';

import { MockVariantConfig } from './MockVariantConfig';

export type MockProviderConfigProps = ILocalVariantConfig & {
    dispatch: () => null;
    labels: LabelsInstance;
};

const mockLabels = ({ Strings: resourceStrings }: IResourceStringsData): LabelsInstance =>
    createLabels({
        resourceStrings,
        transformers: [],
    });

export const MockProviderConfig: FC<Partial<MockProviderConfigProps>> = ({
    children,
    strings = {},
    images = {},
    links = {},
    lists = {},
    elements = {},
    dispatch = (): null => null,
    labels = mockLabels(getResourcesDictionary()),
}) => {
    const variantConfig: ILocalVariantConfig = {
        strings,
        images,
        links,
        lists,
        elements,
    };

    return (
        <VariantConfigsContext.Provider value={{ dispatch, config: variantConfig }}>
            <LabelsProvider value={{ labels }}>
                <ThemeProvider theme={themes.darkTheme}>{children}</ThemeProvider>
            </LabelsProvider>
        </VariantConfigsContext.Provider>
    );
};

export const renderWithVariantConfig =
    (config: ILocalVariantConfig = MockVariantConfig) =>
    (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
        render(<MockProviderConfig {...config}>{ui}</MockProviderConfig>, options);

export const hookOptionsWithConfig: RenderHookOptions<Partial<ILocalVariantConfig>> = {
    wrapper: MockProviderConfig,
    initialProps: MockVariantConfig,
};
