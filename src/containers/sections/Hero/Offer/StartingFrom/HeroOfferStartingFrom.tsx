import { ElementSettingKeys } from '@config/ConfigsKeys';
import { OfferOption } from '@hooks/dazn/offer/types';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import React, { FC } from 'react';

import { HeroPrice } from '../Price/HeroPrice';
import { HeroPriceTypesEnum } from '../Price/types';

export interface HeroOfferStartingFromProps {
    offer: NonNullable<OfferOption>;
}

export const HeroOfferStartingFrom: FC<HeroOfferStartingFromProps> = ({ offer }) => (
    <HeroPrice type={HeroPriceTypesEnum.StartingFrom}>
        <HeroPrice.Label />
        <HeroPrice.Value>
            {offer.price}
            {useElementSetting(ElementSettingKeys.HeroPriceDetail)}
        </HeroPrice.Value>
        <HeroPrice.Cta selectPlan />
    </HeroPrice>
);
