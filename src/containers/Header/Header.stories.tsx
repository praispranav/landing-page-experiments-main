import { mockOffersByLocale } from '@containers/sections/Hero/Offer/__stories__/MockedResponse';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { currencyMap } from '@utils/dazn/__mocks__/constants';
import React from 'react';

import { BelowHeaderStorySection } from './__mocks__/BelowHeaderStorySection';
import { Header } from './Header';

export const Default: Story = ({ locale }) => {
    useXhrMocks([mockOffersByLocale(locale)]);

    return (
        <>
            <Header />
            <BelowHeaderStorySection data-testid="SECTION_ON_FOLD" />
            <BelowHeaderStorySection data-testid="SECTION_BELOW_FOLD" />
            <BelowHeaderStorySection />
        </>
    );
};

export const HeaderWithRelativeElement: Story = ({ locale }) => {
    useXhrMocks([mockOffersByLocale(locale)]);

    return (
        <>
            <Header />
            <BelowHeaderStorySection data-testid="SECTION_ON_FOLD">
                <div
                    data-testid="SECTION_RELATIVE_CONTENT"
                    style={{ width: 300, height: 300, position: 'relative', background: 'white' }}
                />
            </BelowHeaderStorySection>
            <BelowHeaderStorySection data-testid="SECTION_BELOW_FOLD" />
        </>
    );
};

export default {
    title: 'Sections/Header',
    argTypes: {
        locale: {
            control: {
                type: 'select',
                options: Object.keys(currencyMap),
            },
        },
    },
    args: {
        locale: 'de-DE',
    },
};
