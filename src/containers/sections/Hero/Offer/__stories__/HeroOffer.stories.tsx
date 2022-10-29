import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';

import { HeroOffer } from '../HeroOffer';
import { locale as localeControl } from './Controls';
import { mockOffersByLocale } from './MockedResponse';

export const Default: Story = ({ displayType, locale }) => {
    useXhrMocks([mockOffersByLocale(locale)]);

    return <HeroOffer displayType={displayType} />;
};

export default {
    title: 'Sections/Hero/Offer',
    argTypes: { locale: localeControl },
    args: { displayType: 'COPY', locale: 'de-DE' },
    component: { HeroOffer },
};
