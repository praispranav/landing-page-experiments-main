import { SportsGrid } from '@components/Sports/SportsGrid/SportsGrid';

import { AnnouncementBanner } from './AnnouncementBanner/AnnouncementBanner';
import { HeroDetails } from './Details/HeroDetails';
import { HeroHeadline } from './Headline/HeroHeadline';
import { HeroBody, HeroHeading } from './Hero';
import { HeroLead } from './Lead/HeroLead';
import { HeroLegal } from './Legal/HeroLegal';
import { HeroOffer } from './Offer/HeroOffer';

export interface HeroHeadingComposition {
    Headline: typeof HeroHeadline;
    Lead: typeof HeroLead;
    AnnouncementBanner: typeof AnnouncementBanner;
    HeroDetails: typeof HeroDetails;
}

export interface HeroBodyComposition {
    Offer: typeof HeroOffer;
    Legal: typeof HeroLegal;
    Sports: typeof SportsGrid;
}

export interface HeroComposition {
    Heading: typeof HeroHeading;
    Body: typeof HeroBody;
}

export interface HeroProps {
    testId: string;
}
