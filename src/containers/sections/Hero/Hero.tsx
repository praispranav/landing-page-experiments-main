import { ThemeEnum } from '@components/Style/Theme';
import React, { FC } from 'react';

import { SportsGrid } from '../../../components/Sports/SportsGrid/SportsGrid';
import { Base } from '../Base/Base';
import { AnnouncementBanner } from './AnnouncementBanner/AnnouncementBanner';
import { HeroDetails } from './Details/HeroDetails';
import { HeroHeadline } from './Headline/HeroHeadline';
import {
    bodySectionStyle,
    headingSectionStyle,
    heroBaseStyle,
    heroContainerStyle,
} from './Hero.style';
import { HeroLead } from './Lead/HeroLead';
import { HeroLegal } from './Legal/HeroLegal';
import { HeroOffer } from './Offer/HeroOffer';
import { HeroPicture } from './Picture/HeroPicture';
import { HeroBodyComposition, HeroComposition, HeroHeadingComposition, HeroProps } from './types';

export const HeroHeading: FC & HeroHeadingComposition = ({ children }) => (
    <div css={headingSectionStyle}>{children}</div>
);

HeroHeading.Headline = HeroHeadline;
HeroHeading.Lead = HeroLead;
HeroHeading.AnnouncementBanner = AnnouncementBanner;
HeroHeading.HeroDetails = HeroDetails;

export const HeroBody: FC & HeroBodyComposition = ({ children }) => (
    <div css={bodySectionStyle}>{children}</div>
);

HeroBody.Offer = HeroOffer;
HeroBody.Legal = HeroLegal;
HeroBody.Sports = SportsGrid;

export const Hero: FC<HeroProps> & HeroComposition = ({ children, testId }) => (
    <Base testId={testId} theme={ThemeEnum.ExtraDark} style={heroBaseStyle}>
        <HeroPicture />
        <Base.Container grid style={heroContainerStyle}>
            {children}
        </Base.Container>
    </Base>
);

Hero.Heading = HeroHeading;
Hero.Body = HeroBody;
