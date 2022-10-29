import { DisplayTypeValues } from '@config/ConfigsKeys';

import { heroVariantValue } from './constants';

export type HeroVariantValue = keyof typeof heroVariantValue;

export interface HeroVariantProps {
    displayType: DisplayTypeValues;
}
