import { ElementSettingKeys, ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { IOfferHookResult } from '@hooks/dazn/offer/types';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';
import React, { FC } from 'react';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroPrice } from '../Price/HeroPrice';
import { pricesStyle } from '../Price/HeroPrice.style';
import { HeroPriceHighlight } from '../Price/Highlight/HeroPriceHighlight';
import { HeroPriceTypesEnum } from '../Price/types';

type HeroOfferMonthlyInstalmentPlansProps = Omit<IOfferHookResult, 'annual' | 'error'>;

export const HeroOfferMonthlyIPP: FC<HeroOfferMonthlyInstalmentPlansProps> = ({
    instalments,
    monthly,
}) => {
    const { total: yearlySaved = 0 } = instalments?.amountSaved ?? {};

    const savingTotalKey = useResourceStringKey(ResourceStringsKeys.HeroOfferSavingTotal);
    const asterisk = useElementSetting(ElementSettingKeys.HeroPriceDetail);

    return (
        <div data-testid="HERO_PRICES" css={pricesStyle}>
            {instalments && (
                <HeroPrice type={HeroPriceTypesEnum.Period} period={Periodicity.Instalments}>
                    <HeroPrice.Label />
                    <HeroPrice.Value>
                        {instalments.price}
                        {asterisk}
                    </HeroPrice.Value>
                    <HeroPrice.Cta />
                    {yearlySaved && (
                        <HeroPriceHighlight>
                            <Label
                                stringKey={savingTotalKey}
                                variables={{ savingTotal: yearlySaved }}
                            />
                        </HeroPriceHighlight>
                    )}
                </HeroPrice>
            )}
            {monthly && (
                <HeroPrice type={HeroPriceTypesEnum.Period} period={Periodicity.Month}>
                    <HeroPrice.Label />
                    <HeroPrice.Value>{monthly.price}</HeroPrice.Value>
                    <HeroPrice.Cta />
                </HeroPrice>
            )}
        </div>
    );
};
