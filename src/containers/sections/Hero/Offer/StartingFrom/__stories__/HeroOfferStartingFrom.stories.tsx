import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { getCurrency } from '@utils/dazn/Region';
import { FC, Suspense } from 'react';

import { locale as localeControl } from '../../__stories__/Controls';
import { mockOffersByLocale } from '../../__stories__/MockedResponse';
import { HeroOfferStartingFrom, HeroOfferStartingFromProps } from '../HeroOfferStartingFrom';

const HeroOfferStartingFromType: FC<HeroOfferStartingFromProps> = ({ offer }) => (
    <Suspense fallback={null}>
        <HeroOfferStartingFrom offer={offer} />
    </Suspense>
);

export const StartingFrom: Story = ({ offerPrice, locale }) => {
    useXhrMocks([mockOffersByLocale(locale)]);

    const currency = getCurrency();

    const offer = {
        freeTrialAmount: 0,
        price: formatChargeWithCurrency({ Currency: currency, Price: offerPrice }),
    };

    return <HeroOfferStartingFromType offer={offer} />;
};

export default {
    title: 'Sections/Hero/Offer/Starting From',
    argTypes: { locale: localeControl },
    args: { locale: 'de-DE', offerPrice: 30.99, hasFreeTrial: false },
};
