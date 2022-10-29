export enum Periodicity {
    Month = 'Month',
    Annual = 'Annual',
    Instalments = 'Instalments',
    Default = 'Default',
}

export type PeriodicityKeys = Exclude<Periodicity, 'Default'>;

type PaymentMethodKeys =
    | 'ApplePay'
    | 'PayPal'
    | 'CreditCard'
    | 'DirectCarrierBilling'
    | 'KlarnaPayNow';

interface IPaymentMethod {
    Id: PaymentMethodKeys | string;
    Default: boolean;
    BillingCountries: string[];
    RequireZipCode: boolean;
    GiftCodeDisallowed: boolean;
}

type FreeTrialIneligibilityReasonKeys =
    | 'ForcedHardOffer'
    | 'Eligible'
    | 'GiftCodePreventsFreeTrial'
    | 'AccountStatusPreventsFreeTrial'
    | 'UserDevicePreventsFreeTrial'
    | 'ForcedHardOfferForExternalUser';

export interface ChargeTier {
    Currency: string;
    Price: number;
}

export interface Discount {
    Price: number;
    Percentage: number;
}

export type ChargeTierWithDiscount = ChargeTier & { Discount: Discount };
export type ChargeTiers = ChargeTier | ChargeTierWithDiscount;

export interface Offer {
    Id: string;
    SkuId: string | null;
    BillingPeriod: PeriodicityKeys | string;
    FreeTrialMonths: number;
    TotalFreeMonths: number;
    BillingDate: string;
    RenewalDate: string;
    ChargeTiers: ChargeTier[];
    PaymentMethodIds: PaymentMethodKeys[] | string[];
    AllowsNoPaymentMethod: boolean;
}

type AddonTypeKeys = 'Regular' | 'Bundle';
export interface Addon {
    Id: string;
    SkuId: string;
    Type: AddonTypeKeys;
    ChargeTiers: ChargeTierWithDiscount[];
    PaymentMethodIds: PaymentMethodKeys[];
    EntitlementSetId: string;
    EventStartDate: string;
}

export interface OffersResponse {
    Offers: Offer[];
    Addons: Addon[] | [];
    GiftCode: string | null;
    NoOfferFreeTrialMonths: number;
    FreeTrialIneligibilityReason: FreeTrialIneligibilityReasonKeys | string | null;
    PaymentMethods: IPaymentMethod[];
}
