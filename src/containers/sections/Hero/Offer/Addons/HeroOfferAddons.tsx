import { MonthlyOfferParsed } from '@hooks/dazn/offer/types';
import React, { FC } from 'react';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroPrice } from '../Price/HeroPrice';
import { HeroPriceTypesEnum } from '../Price/types';
import { addonsStyle } from './HeroOfferAddons.style';

interface HeroOfferAddonsProps {
    monthly: MonthlyOfferParsed | null;
    addonPrice: string;
}

export const HeroOfferAddons: FC<HeroOfferAddonsProps> = ({ monthly, addonPrice }) => (
    <div data-testid="HERO_PRICES_ADDONS" css={addonsStyle}>
        <HeroPrice type={HeroPriceTypesEnum.Addon}>
            <HeroPrice.Label />
            <HeroPrice.Value>{addonPrice}</HeroPrice.Value>
        </HeroPrice>

        <HeroPrice type={HeroPriceTypesEnum.Period} period={Periodicity.Month}>
            <HeroPrice.Label />
            <HeroPrice.Value>{monthly?.price}</HeroPrice.Value>
            <HeroPrice.Cta selectPlan />
        </HeroPrice>
    </div>
);
