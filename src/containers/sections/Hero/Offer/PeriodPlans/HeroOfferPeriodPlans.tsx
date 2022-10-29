import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { IOfferHookResult } from '@hooks/dazn/offer/types';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import React, { FC } from 'react';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroPrice } from '../Price/HeroPrice';
import { pricesStyle } from '../Price/HeroPrice.style';
import { HeroPriceHighlight } from '../Price/Highlight/HeroPriceHighlight';
import { HeroPriceTypesEnum } from '../Price/types';

export type HeroOfferPeriodPlansProps = Omit<IOfferHookResult, 'error' | 'instalments'>;
export const HeroOfferPeriodPlans: FC<HeroOfferPeriodPlansProps> = ({ monthly, annual }) => {
    const { percentageSave = 0 } = annual?.amountSaved ?? {};

    const savingTotalKey = useResourceStringKey(ResourceStringsKeys.HeroOfferSavingTotal);

    return (
        <div data-testid="HERO_PRICES" css={pricesStyle}>
            {monthly && (
                <HeroPrice type={HeroPriceTypesEnum.Period} period={Periodicity.Month}>
                    <HeroPrice.Label />
                    <HeroPrice.Value>{monthly.price}</HeroPrice.Value>
                    <HeroPrice.Cta />
                </HeroPrice>
            )}

            {annual && (
                <HeroPrice type={HeroPriceTypesEnum.Period} period={Periodicity.Annual}>
                    <HeroPrice.Label />
                    <HeroPrice.Value>{annual.price}</HeroPrice.Value>
                    <HeroPrice.Cta />
                    {annual.amountSaved && (
                        <HeroPriceHighlight>
                            <Label
                                stringKey={savingTotalKey}
                                variables={{ savingTotal: `${percentageSave}%` }}
                            />
                        </HeroPriceHighlight>
                    )}
                </HeroPrice>
            )}
        </div>
    );
};
