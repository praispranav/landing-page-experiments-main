import React, { FC } from 'react';

import { Hero } from '../Hero';
import { HeroVariantProps } from './types';

export const HeroEvent: FC<HeroVariantProps> = ({ displayType }) => (
    <Hero testId="HERO_EVENT_VARIANT">
        <Hero.Heading>
            <Hero.Heading.Headline />
            <Hero.Heading.AnnouncementBanner />
            <Hero.Heading.Lead />
        </Hero.Heading>
        <Hero.Body>
            <Hero.Body.Offer displayType={displayType} />
        </Hero.Body>
    </Hero>
);
