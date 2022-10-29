import { ElementSectionFragment, EventType } from '@dazn/fe-events';
import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import { Dispatch, SetStateAction } from 'react';

export enum ElementSection {
    Header = 'header',
    Body = 'body',
    Footer = 'footer',
}

export interface UseImpressionTracking {
    setTrackingRef: Dispatch<SetStateAction<HTMLElement | null | undefined>>;
}

export enum ElementVisibilitySections {
    ComingUp = 'coming up',
    ContentTiers = 'content tiers',
    Devices = 'devices',
    Faq = 'faq',
    Footer = 'footer',
    MarketProposition = 'market proposition',
    WhatsOn = 'whats on',
}
export interface IEventMeta {
    deprecated: boolean;
    gtm: boolean;
    name: string;
}

export type ElementClickItemId =
    | ResourceStringLabel
    | ''
    | 'faq_box'
    | 'dazn_logo'
    | 'calendar_date'
    | 'sport_filter';

export interface IElementClick {
    section: ElementSectionFragment;
    itemId?: ElementClickItemId;
    resourceString: string;
}

export type EventPayload = EventType & { event: IEventMeta['name'] };

type DataLayer = EventPayload[];

declare global {
    interface Window {
        dataLayer: null | DataLayer;
    }
}

export type HtmlElement = HTMLElement | undefined | null;
