import '../src/polyfills';

import React from 'react';
import { AppWrapper } from '../src/AppWrapper';
import colors from '../src/components/Style/Colors';
import { MockProviderConfig } from '../src/experiments/__mocks__/MockProviderConfig';
import { MockVariantConfig } from '../src/experiments/__mocks__/MockVariantConfig';
import { mockBootstrap } from '../dev/mockBootstrap';

export const parameters = {
    layout: 'fullscreen',
    actions: { argTypesRegex: '^on[A-Z].*' },
    backgrounds: {
        default: 'tarmac',
        values: [
            { name: 'white', value: colors.white },
            { name: 'iron', value: colors.iron },
            { name: 'tarmac', value: colors.tarmac },
        ],
    },
    options: {
        storySort: {
            order: ['Experiments'],
        },
    },
};

const PreviewLayout = ({ children }) => {
    window.dazn = mockBootstrap;

    return (
        <AppWrapper>
            <MockProviderConfig {...MockVariantConfig}>{children}</MockProviderConfig>
        </AppWrapper>
    );
};

export const decorators = [
    (Story) => (
        <PreviewLayout>
            <Story />
        </PreviewLayout>
    ),
];
