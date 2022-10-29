import { DEVICES_STRINGS } from './Devices';
import { FAQ_STRINGS } from './Faq';
import { FOOTER_STRINGS } from './Footer';
import { HEADER_STRINGS } from './Header';
import { HERO_STRINGS } from './Hero';
import { MARKET_PROPOSITION } from './MarketProposition';
import { OFFER_STRINGS } from './Offer';
import { PPV_STRINGS } from './PPV';
import { WHATS_ON_STRINGS } from './WhatsOn';

export const VARIANT_STRINGS_CONFIG = {
    ...HERO_STRINGS,
    ...OFFER_STRINGS,
    ...HEADER_STRINGS,
    ...MARKET_PROPOSITION,
    ...WHATS_ON_STRINGS,
    ...DEVICES_STRINGS,
    ...FAQ_STRINGS,
    ...FOOTER_STRINGS,
    ...PPV_STRINGS,
} as const;
