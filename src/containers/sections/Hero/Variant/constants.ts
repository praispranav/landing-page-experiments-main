import { HeroVariantEnum } from '@config/ConfigsKeys';

export const heroVariantValue = {
    ...HeroVariantEnum,
    PayPerView: 'PayPerView',
} as const;
