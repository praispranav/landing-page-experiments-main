type CountryPortabilityStatusKeys =
    | 'NativeAndPortabilityAvailable'
    | 'PortabilityAvailable'
    | 'Native'
    | 'None';

export interface IRegion {
    isAllowed: boolean;
    GeolocatedCountryName: string;
    GeolocatedSubregion: string;
    GeolocatedRegion: string;
    Currency: string;
    CountrySubdivision: string | null;
    isMoon: boolean;
    Country: string;
    GeolocatedCountry: string;
    Language: string;
    isAnonymous: boolean;
    MarketingEmailsDefault: boolean;
    HideMarketingOptIns: boolean;
    HideNflMarketingOptIns: boolean;
    CountryPortabilityStatus: CountryPortabilityStatusKeys;
}
