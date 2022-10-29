import AddonsResponse from '@hooks/dazn/offer/__mocks__/AddonsResponse.json';
import { formatChargeWithCurrency } from '@hooks/dazn/offer/shared/ChargeTier';
import { MonthlyOfferParsed } from '@hooks/dazn/offer/types';
import { Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';
import { getCurrency } from '@utils/dazn/Region';
import { Addon as AddonType } from 'types/dazn/RatePlans/Offers';

import { mockOffersRequest } from '../../__stories__/MockedResponse';
import { HeroOfferAddons } from '../HeroOfferAddons';

export const Addon: Story = ({ monthlyPrice, addonPrice }) => {
    const currency = getCurrency();
    const mockAddons = {
        ...AddonsResponse.Addons[0],
        ChargeTiers: [
            {
                Currency: currency,
                Price: addonPrice,
                Discount: { Price: addonPrice, Percentage: 0 },
            },
        ],
    } as AddonType;

    const monthly: MonthlyOfferParsed = {
        freeTrialAmount: 0,
        price: formatChargeWithCurrency({ Currency: currency, Price: monthlyPrice }),
    };

    const addon = formatChargeWithCurrency({ Currency: currency, Price: addonPrice });

    useXhrMocks([mockOffersRequest({ Addons: [mockAddons] })]);

    return <HeroOfferAddons monthly={monthly} addonPrice={addon} />;
};

export default {
    title: 'Sections/Hero/Offer/Addon',
    component: Addon,
    args: { monthlyPrice: 10.99, addonPrice: 40.99 },
};
