import { createContext, useContext } from 'react';
import { Periodicity, PeriodicityKeys } from 'types/dazn/RatePlans/Offers';

import { HeroPriceProps, HeroPriceTypesEnum } from './types';

export const HeroPriceContext = createContext<HeroPriceProps>({
    type: HeroPriceTypesEnum.Period,
    period: Periodicity.Month,
});

export const usePricePeriod = (): PeriodicityKeys | null => {
    const context = useContext(HeroPriceContext);

    if (
        context.type === HeroPriceTypesEnum.Addon ||
        context.type === HeroPriceTypesEnum.StartingFrom
    ) {
        return null;
    }

    return context.period;
};

export const usePriceType = (): HeroPriceTypesEnum => {
    const { type } = useContext(HeroPriceContext);
    return type;
};
