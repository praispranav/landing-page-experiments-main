export interface IAmountSaved {
    total: string;
    monthly: string;
    percentageSave: number;
}

export interface IOfferParsed {
    price?: string;
    freeTrialAmount: number;
    value?: number;
}

export type MonthlyOfferParsed = IOfferParsed;
export type AnnualOfferParsed = IOfferParsed & { amountSaved: IAmountSaved | null };
export type InstalmentsOfferParsed = IOfferParsed & { amountSaved: IAmountSaved | null };

export type OfferOption = MonthlyOfferParsed | AnnualOfferParsed | InstalmentsOfferParsed | null;

export interface IOfferHookResult {
    annual: AnnualOfferParsed | null;
    monthly: MonthlyOfferParsed | null;
    instalments: InstalmentsOfferParsed | null;
    error: unknown;
}

export interface IRatePlansParams {
    Platform: 'web';
    Manufacturer: '';
}
