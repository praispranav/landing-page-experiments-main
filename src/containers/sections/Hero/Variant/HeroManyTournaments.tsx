import React, { FC } from 'react';

import { Hero } from '../Hero';
import { HeroVariantProps } from './types';

export const HeroManyTournaments: FC<HeroVariantProps> = ({ displayType }) => (
    <Hero testId="HERO_MANY_TOURNAMENTS_VARIANT">
        <Hero.Heading>
            <Hero.Heading.Headline />
            <Hero.Heading.AnnouncementBanner />
            <Hero.Heading.Lead />
        </Hero.Heading>
        <Hero.Body>
            <Hero.Body.Offer displayType={displayType} />
            <Hero.Body.Legal />
            <Hero.Body.Sports />
        </Hero.Body>
    </Hero>
);
