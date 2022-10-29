import { FC } from 'react';

import { heroVariantValue } from './constants';
import { HeroEvent } from './HeroEvent';
import { HeroManyTournaments } from './HeroManyTournaments';
import { HeroPPV } from './HeroPPV';
import { useHeroVariant, useVariantDisplayType } from './HeroVariant.hooks';
import { HeroVariantProps, HeroVariantValue } from './types';

export const HeroVariant: FC = () => {
    const HERO_VARIANTS: Record<HeroVariantValue, FC<HeroVariantProps>> = {
        [heroVariantValue.ManyTournaments]: HeroManyTournaments,
        [heroVariantValue.Event]: HeroEvent,
        [heroVariantValue.PayPerView]: HeroPPV,
    };

    const variant = useHeroVariant();
    const displayType = useVariantDisplayType();

    const HeroComponent = HERO_VARIANTS[variant];

    return <HeroComponent displayType={displayType} />;
};
