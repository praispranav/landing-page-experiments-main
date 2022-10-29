import { useGetClosestAddon } from '@hooks/dazn/offer/UseAddon';
import { useFormatEventDate } from '@utils/Date';
import { FC } from 'react';

import { Hero } from '../Hero';
import { HeroPPVTag } from '../PPV/PPVTag/HeroPPVTag';
import { HeroVariantProps } from './types';

export const HeroPPV: FC<HeroVariantProps> = ({ displayType }) => {
    const closestAddonDate = useGetClosestAddon()?.EventStartDate || '';
    const eventDate = useFormatEventDate(closestAddonDate);

    return (
        <Hero testId="HERO_PPV">
            <Hero.Heading>
                <HeroPPVTag />
                <Hero.Heading.Headline />
                <Hero.Heading.AnnouncementBanner />
                <Hero.Heading.Lead />
                <Hero.Heading.HeroDetails details={eventDate} />
            </Hero.Heading>
            <Hero.Body>
                <Hero.Body.Offer displayType={displayType} />
            </Hero.Body>
        </Hero>
    );
};
