import {
    DisplayTypeValues,
    ElementSettingKeys,
    FooterElements,
    HeroVariantEnum,
    ResourceStringsKeys,
} from '@config/ConfigsKeys';
import { WhatsOnVariantEnum } from '@containers/sections/WhatsOn/Variants';
import facepaint from 'facepaint';

type FooterResourceStringLabel =
    | 'footer_specifiedCommercialTransactions'
    | 'footer_help'
    | 'footer_news'
    | 'footer_faq'
    | 'footer_terms'
    | 'footer_termsOfUse_Plus'
    | 'footer_privace'
    | 'footer_impressum'
    | 'footer_language_switcher'
    | 'footer_media'
    | 'footer_about'
    | 'footer_careers'
    | 'footer_redeem'
    | 'footer_trademark'
    | 'footer_cancelLink'
    | 'footer_DAZN_for_Business'
    | 'footer_explore';

export type ResourceStringLabel =
    | 'landingpages_web_hero_title_ppv'
    | 'landingpages_web_hero_description_ppv'
    | 'landingpages_web_hero_details_ppv'
    | 'landingpages_web_hero_billingMonthly_ppv'
    | 'landingpages_web_hero_button_getStarted_ppv'
    | 'landingpages_web_hero_billingAddon_ppv'
    | 'browseui_highlightsonly'
    | 'landingpages_web_hero_accessCode'
    | 'landingpages_web_hero_title'
    | 'landingpages_web_hero_announcementBanner'
    | 'landingpages_web_hero_description'
    | 'landingpages_web_hero_savingTotal'
    | 'landingpages_web_hero_annualOffer'
    | 'landingpages_web_hero_monthlyOffer'
    | 'landingpages_web_hero_billingMonthlyInstalment'
    | 'landingpages_web_hero_annualMonthlyOffer'
    | 'landingpages_web_hero_freeTrialOne'
    | 'landingpages_web_hero_freeTrialMultiple'
    | 'landingpages_web_hero_button_signUp'
    | 'landingpages_web_hero_button_freeTrial'
    | 'landingpages_web_hero_button_getStarted'
    | 'landingpages_web_hero_billingAnnual'
    | 'landingpages_web_hero_billingFrom'
    | 'landingpages_web_hero_billingMonth'
    | 'landingpages_web_hero_billingMonthly'
    | 'landingpages_web_hero_billingAddon'
    | 'landingpages_web_hero_billingYearly'
    | 'landingpages_web_hero_savingMonthly'
    | 'landingpages_web_hero_legal'
    | 'landingpages_web_header_button_signIn'
    | 'landingpages_web_header_button_signUp'
    | 'landingpages_web_header_button_freeTrial'
    | 'landingpages_web_whatsOn_title'
    | 'landingpages_web_devices_title'
    | 'landingpages_web_devices_subtitle'
    | 'landingpages_web_devices_button'
    | 'landingpages_web_devices_icon-label-mobile'
    | 'landingpages_web_devices_icon-label-tv'
    | 'landingpages_web_devices_icon-label-web'
    | 'landingpages_web_devices_icon-label-console'
    | 'landingpages_web_faq_title'
    | 'help_categoryName_getting_started'
    | 'help_categoryName_my_dazn_account'
    | 'help_categoryName_watching_dazn'
    | 'help_categoryName_payment_and_billing'
    | 'schedule_allSports'
    | 'browseui_tileLabelToday'
    | 'PPVlabel'
    | 'SubscribeToBuy'
    | 'landingpages_web_marketproposition_heading'
    | 'landingpages_web_marketproposition_description'
    | 'landingpages_web_marketproposition_card1_heading'
    | 'landingpages_web_marketproposition_card1_content'
    | 'landingpages_web_marketproposition_card2_heading'
    | 'landingpages_web_marketproposition_card2_content'
    | 'landingpages_web_marketproposition_card3_heading'
    | 'landingpages_web_marketproposition_card3_content'
    | 'landingpages_web_marketproposition_cta'
    | 'addon_eventStartDateTime_MoreThanWeekAgo'
    | 'addon_eventStartDateTime_LessThanWeekAgo'
    | 'addon_eventStartDateTime_Yesterday'
    | 'addon_eventStartDateTime_LastNight'
    | 'addon_eventStartDateTime_Today'
    | 'addon_eventStartDateTime_ThisEvening'
    | 'addon_eventStartDateTime_Tonight'
    | 'addon_eventStartDateTime_Tomorrow'
    | 'addon_eventStartDateTime_LessThanWeekAway'
    | 'addon_eventStartDateTime_MoreThanWeekAway'
    | FooterResourceStringLabel;

export type StringsConfigKey = ResourceStringsKeys | FooterElements;

export type VariantLocalStrings = Partial<Record<StringsConfigKey, ResourceStringLabel>>;

export type VariantLocalLinks = Record<string, string>;

export interface ILocalImageObject {
    src: string;
    screenWidth?: 540 | 768 | 1024;
}

export type LocalImageValue = string | ILocalImageObject[];
export type VariantLocalImages = Record<string, LocalImageValue>;

export interface FooterItem {
    key: ResourceStringLabel;
    label: string;
    href: string;
}

export type VariantLocalList = string[] | FooterItem[];

export type VariantLocalLists = Record<string, VariantLocalList>;

export interface VariantLocalElements {
    [ElementSettingKeys.HeroOfferDisplayType]?: DisplayTypeValues;
    [ElementSettingKeys.WhatsOnVariant]?: WhatsOnVariantEnum;
    [ElementSettingKeys.RailId]?: string;
    [ElementSettingKeys.HeroImagePosition]?: facepaint.Arg;
    [ElementSettingKeys.HeroPicturePosition]?: facepaint.Arg;
    [ElementSettingKeys.HeroVariant]?: HeroVariantEnum;
    [ElementSettingKeys.PPVFeatureFlag]?: boolean;
    [ElementSettingKeys.HeroPriceDetail]?: string;
    [ElementSettingKeys.MarketPropositionSection]?: boolean;
    [ElementSettingKeys.AnnouncementBanner]?: boolean;
    [ElementSettingKeys.HeroDetails]?: boolean;
}
