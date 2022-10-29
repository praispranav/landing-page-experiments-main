import { formatWithCurrency } from '@utils/Currency';
import { getCurrency } from '@utils/dazn/Region';
import { Offer, Periodicity, PeriodicityKeys } from 'types/dazn/RatePlans/Offers';

import { formatChargeWithCurrency, useChargeForCurrency } from './shared/ChargeTier';
import { useOffersService } from './shared/UseOfferService';
import {
    AnnualOfferParsed,
    IAmountSaved,
    InstalmentsOfferParsed,
    IOfferHookResult,
    MonthlyOfferParsed,
    OfferOption,
} from './types';

const isOfferOfPeriod =
    (period: PeriodicityKeys) =>
    (offer: Offer): boolean =>
        offer.BillingPeriod === period;

const useMonthlyOffer = (currency: string, offers: Offer[] = []): MonthlyOfferParsed | null => {
    const monthlyOffer = offers.find(isOfferOfPeriod(Periodicity.Month));
    const monthlyCharge = useChargeForCurrency(currency, monthlyOffer?.ChargeTiers);

    if (!monthlyCharge) {
        return null;
    }

    return {
        price: formatChargeWithCurrency(monthlyCharge),
        freeTrialAmount: monthlyOffer?.FreeTrialMonths ?? 0,
        value: monthlyCharge?.Price,
    };
};

const getAmountSaved = (
    monthlySaved: number,
    originalMonthlyCharge: number,
    currency: string,
): IAmountSaved => {
    const monthlyTotal = monthlySaved * 12;
    const percentageSave = Math.trunc((monthlySaved / originalMonthlyCharge) * 100);

    return {
        monthly: formatWithCurrency(monthlySaved, currency),
        total: formatWithCurrency(monthlyTotal, currency),
        percentageSave,
    };
};

const useAnnualOffer = (currency: string, offers: Offer[] = []): AnnualOfferParsed | null => {
    let amountSaved: IAmountSaved | null = null;

    const monthlyOffer = offers.find(isOfferOfPeriod(Periodicity.Month));
    const monthlyCharge = useChargeForCurrency(currency, monthlyOffer?.ChargeTiers);

    const annualOffer = offers.find(isOfferOfPeriod(Periodicity.Annual));
    const annualCharge = useChargeForCurrency(currency, annualOffer?.ChargeTiers);

    if (!annualCharge) {
        return null;
    }

    if (monthlyCharge) {
        const monthlySaved = monthlyCharge.Price - annualCharge.Price / 12;
        amountSaved = getAmountSaved(monthlySaved, monthlyCharge.Price, currency);
    }

    return {
        price: formatChargeWithCurrency(annualCharge),
        freeTrialAmount: annualOffer?.FreeTrialMonths ?? 0,
        amountSaved,
        value: annualCharge?.Price,
    };
};

const useInstalmentsOffer = (
    currency: string,
    offers: Offer[] = [],
): InstalmentsOfferParsed | null => {
    let amountSaved: IAmountSaved | null = null;

    const monthlyOffer = offers.find(isOfferOfPeriod(Periodicity.Month));
    const monthlyCharge = useChargeForCurrency(currency, monthlyOffer?.ChargeTiers);

    const instalmentsOffer = offers.find(isOfferOfPeriod(Periodicity.Instalments));
    const instalmentsCharge = useChargeForCurrency(currency, instalmentsOffer?.ChargeTiers);

    if (!instalmentsCharge) {
        return null;
    }

    if (monthlyCharge) {
        const monthlySave = monthlyCharge.Price - instalmentsCharge.Price;
        amountSaved = getAmountSaved(monthlySave, monthlyCharge.Price, currency);
    }

    return {
        price: formatChargeWithCurrency(instalmentsCharge),
        freeTrialAmount: instalmentsOffer?.FreeTrialMonths ?? 0,
        amountSaved,
        value: instalmentsCharge?.Price,
    };
};

export const useOffer = (): IOfferHookResult => {
    const currency = getCurrency();
    const { data, error } = useOffersService();

    const annual = useAnnualOffer(currency, data?.Offers);
    const monthly = useMonthlyOffer(currency, data?.Offers);
    const instalments = useInstalmentsOffer(currency, data?.Offers);

    return { annual, monthly, instalments, error };
};

export const getStartingFromOffer = (...args: OfferOption[]): OfferOption => {
    const offer = args.reduce((prev, current) => {
        const prevValue = prev?.value;
        const currentValue = current?.value;

        if (prevValue && currentValue) {
            return prevValue < currentValue ? prev : current;
        }

        if (prevValue) {
            return prev;
        }

        if (currentValue) {
            return current;
        }

        return null;
    }, args[0]);

    return offer;
};
