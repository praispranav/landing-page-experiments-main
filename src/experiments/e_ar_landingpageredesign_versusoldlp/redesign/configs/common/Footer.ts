import { FooterElements } from '@config/ConfigsKeys';
import { FooterItem } from '@hooks/resourceStrings/Types';
import { getDictionaryLink, getDictionaryString } from '@utils/dazn/ResourcesDictionary';

const {
    FooterSCTL,
    FooterHelp,
    FooterNews,
    FooterFaq,
    FooterTerms,
    FooterTermsPlus,
    FooterPrivacy,
    FooterImprint,
    FooterMedia,
    FooterAboutUs,
    FooterCareers,
    FooterRedeem,
    FooterTrademark,
    FooterLanguageSwitcher,
    FooterCancel,
    FooterDAZNForBusiness,
    FooterExplore,
} = FooterElements;

export const FOOTER_STRINGS = {
    [FooterSCTL]: 'footer_specifiedCommercialTransactions',
    [FooterHelp]: 'footer_help',
    [FooterNews]: 'footer_news',
    [FooterFaq]: 'footer_faq',
    [FooterTerms]: 'footer_terms',
    [FooterTermsPlus]: 'footer_termsOfUse_Plus',
    [FooterPrivacy]: 'footer_privace',
    [FooterImprint]: 'footer_impressum',
    [FooterMedia]: 'footer_media',
    [FooterAboutUs]: 'footer_about',
    [FooterCareers]: 'footer_careers',
    [FooterRedeem]: 'footer_redeem',
    [FooterTrademark]: 'footer_trademark',
    [FooterLanguageSwitcher]: 'footer_language_switcher',
    [FooterCancel]: 'footer_cancelLink',
    [FooterDAZNForBusiness]: 'footer_DAZN_for_Business',
    [FooterExplore]: 'footer_explore',
} as const;

export const getFooterElements = (): Record<string, FooterItem> => ({
    sctl: {
        key: FOOTER_STRINGS[FooterSCTL],
        label: getDictionaryString(FOOTER_STRINGS[FooterSCTL]),
        href: getDictionaryLink('SpecifiedCommercialTransactions'),
    },
    help: {
        key: FOOTER_STRINGS[FooterHelp],
        label: getDictionaryString(FOOTER_STRINGS[FooterHelp]),
        href: getDictionaryLink('Help'),
    },
    news: {
        key: FOOTER_STRINGS[FooterNews],
        label: getDictionaryString(FOOTER_STRINGS[FooterNews]),
        href: getDictionaryLink('News'),
    },
    faq: {
        key: FOOTER_STRINGS[FooterFaq],
        label: getDictionaryString(FOOTER_STRINGS[FooterFaq]),
        href: getDictionaryLink('Faq'),
    },
    terms: {
        key: FOOTER_STRINGS[FooterTerms],
        label: getDictionaryString(FOOTER_STRINGS[FooterTerms]),
        href: getDictionaryLink('Terms'),
    },
    termsPlus: {
        key: FOOTER_STRINGS[FooterTermsPlus],
        label: getDictionaryString(FOOTER_STRINGS[FooterTermsPlus]),
        href: getDictionaryLink('TermsPlus'),
    },
    privacy: {
        key: FOOTER_STRINGS[FooterPrivacy],
        label: getDictionaryString(FOOTER_STRINGS[FooterPrivacy]),
        href: getDictionaryLink('Privacy'),
    },
    imprint: {
        key: FOOTER_STRINGS[FooterImprint],
        label: getDictionaryString(FOOTER_STRINGS[FooterImprint]),
        href: getDictionaryLink('imprint'),
    },
    media: {
        key: FOOTER_STRINGS[FooterMedia],
        label: getDictionaryString(FOOTER_STRINGS[FooterMedia]),
        href: getDictionaryLink('Media'),
    },
    aboutUs: {
        key: FOOTER_STRINGS[FooterAboutUs],
        label: getDictionaryString(FOOTER_STRINGS[FooterAboutUs]),
        href: getDictionaryLink('About'),
    },
    careers: {
        key: FOOTER_STRINGS[FooterCareers],
        label: getDictionaryString(FOOTER_STRINGS[FooterCareers]),
        href: getDictionaryLink('Careers'),
    },
    redeem: {
        key: FOOTER_STRINGS[FooterRedeem],
        label: getDictionaryString(FOOTER_STRINGS[FooterRedeem]),
        href: getDictionaryLink('Redeem'),
    },
    cancel: {
        key: FOOTER_STRINGS[FooterCancel],
        label: getDictionaryString(FOOTER_STRINGS[FooterCancel]),
        href: getDictionaryLink('Cancel'),
    },
    business: {
        key: FOOTER_STRINGS[FooterDAZNForBusiness],
        label: getDictionaryString(FOOTER_STRINGS[FooterDAZNForBusiness]),
        href: getDictionaryLink('DaznForBusiness'),
    },
    explore: {
        key: FOOTER_STRINGS[FooterExplore],
        label: getDictionaryString(FOOTER_STRINGS[FooterExplore]),
        href: 'https://www.dazn.com/home',
    },
});
