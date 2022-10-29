import { PeriodicityKeys } from 'types/dazn/RatePlans/Offers';

export enum HeroPriceTypesEnum {
    Period,
    Addon,
    StartingFrom,
}

export type HeroPriceProps =
    | { type: HeroPriceTypesEnum.StartingFrom }
    | { type: HeroPriceTypesEnum.Addon }
    | {
          type: HeroPriceTypesEnum.Period;
          period: PeriodicityKeys;
      };
