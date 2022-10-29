import { VARIANT_STRINGS_CONFIG } from '@experiments/e_ar_landingpageredesign_versusoldlp/redesign/configs/common/VariantStringsConfig';
import { ILocalVariantConfig } from '@experiments/IVariantConfig';

import heroBackground from './f1HeroBackground.png';

/* eslint-disable @typescript-eslint/naming-convention, id-length */
export const MockVariantConfig = {
    strings: VARIANT_STRINGS_CONFIG,
    links: {
        DEVICES_BUTTON: 'https://www.dazn.com/en-US/help/articles/what-are-dazn-supported-devices',
        FOOTER_HELP: 'https://www.dazn.com/en-DE/help',
        FOOTER_FAQ: 'https://www.dazn.com/en-DE/help/categories/faq',
        FOOTER_TERM_OF_USE: 'https://www.dazn.com/en-DE/help/articles/terms-de',
        FOOTER_PRIVACY_POLICY: 'https://www.dazn.com/en-DE/help/articles/privacy-de',
        FOOTER_IMPRINT: 'https://www.dazn.com/help/articles/imprint-global',
        FOOTER_MEDIA: 'https://www.dazn.com/help/articles/about-dazn-de',
    },
    images: {
        HERO_BACKGROUND: heroBackground,
    },
    lists: {
        SPORTS_LOGO_LIST: [
            '65068101963_image-tile_pLa_1584112771000',
            '47013445672_image-tile_pLa_1584112761000',
            '51374661839_image-tile_pLa_1605117852000',
            '83150405280_image-tile_pDach_1584364143000',
            '83010117235_image-tile_pDach_1532610963000',
            '83017797497_image-tile_pDach_1584364160000',
            '83077701200_image-tile_pDach_1584364168000',
            '250497605221_image-tile_pDach_1584364160000',
            '115327045185_image-tile_pDach_1594825958000',
            '470423109444_image-tile_pEs_1606387588000',
            '365450821169_image-tile_pEs_1606387588000',
            '470923333104_image-tile_pEs_1608213225000',
            '412542021155_image-tile_pEs_1606387588000',
        ],
        FOOTER: [
            {
                key: 'footer_help',
                label: 'HELP',
                href: 'https://www.dazn.com/help',
            },
            {
                key: 'footer_faq',
                label: 'FAQ',
                href: 'https://www.dazn.com/faq',
            },
        ],
    },
    elements: {
        DEVICES_THEME: 'Neon',
        DEVICES_BUTTON_THEME: 'Extra-Dark',
    },
} as ILocalVariantConfig;
