import { formatWithCurrency } from '@utils/Currency';
import { useMemo } from 'react';
import { ChargeTier, ChargeTierWithDiscount } from 'types/dazn/RatePlans/Offers';

export const getChargeForCurrency = <T extends ChargeTier>(
    currency: string,
    chargeTiers: T[],
): T | undefined => {
    const chargeForCurrency = chargeTiers.find(
        (charge) => charge.Currency.toLowerCase() === currency,
    );

    return chargeForCurrency;
};

export const useChargeForCurrency = (
    currency: string,
    chargeTiers?: ChargeTier[],
): ChargeTier | undefined =>
    useMemo(() => {
        if (!chargeTiers) {
            return undefined;
        }

        return getChargeForCurrency(currency, chargeTiers);
    }, [currency, chargeTiers]);

const chargeTierHasDiscount = (
    chargeTier: ChargeTier | ChargeTierWithDiscount,
): chargeTier is ChargeTierWithDiscount =>
    Boolean((chargeTier as ChargeTierWithDiscount).Discount);

export const getPriceFromChargeTier = (chargeTier: ChargeTier | ChargeTierWithDiscount): number =>
    chargeTierHasDiscount(chargeTier) ? chargeTier.Discount.Price : chargeTier.Price;

export const formatChargeWithCurrency = (chargeTier: ChargeTier): string => {
    const { Currency, Price } = chargeTier;

    return formatWithCurrency(Price, Currency);
};
