export interface RailSport {
    Id: string;
    Title: string;
    Images: RailImage[];
}

export interface RailImage {
    ImageMimeType: string;
    ImageType: string;
    Id: string;
}

export interface RailVideo {
    Id: string;
    Format: string;
}

export interface RailCompetition {
    Id: string;
    Title: string;
}

export interface RailTournament {
    Id: string;
    Title: string;
}

export type RailTypeKeys = 'Promo' | 'Navigation' | 'Default' | 'Sport' | 'Standard';

export type RailTileTypeKeys =
    | 'Condensed'
    | 'Coaches'
    | 'CatchUp'
    | 'Highlights'
    | 'Live'
    | 'UpComing'
    | 'OnDemand'
    | 'Navigation'
    | 'Content'
    | 'Text'
    | 'Skeleton';

export interface RailTile {
    Id: string;
    AgeRating: null;
    AssetId: string;
    AssetTypeId: string;
    EventId: string;
    Type: RailTileTypeKeys;
    NavigateTo: null;
    NavParams: null;
    Title: string;
    Description: string;
    Start: string;
    End: string | null;
    Image: RailImage;
    BackgroundImage: null;
    PromoImage: RailImage | null;

    Sport: RailSport;
    Videos: RailVideo[];

    EntitlementIds: string[];

    // who knows
    Related: unknown[];
    TournamentCalendar: RailTournament;
    ExpirationDate: string | null;
    VideoType: string;
    IsGeoRestricted: false;
    IsLinear: false;
    Status: null;
    Label: string;
    IsDownloadable: false;
    VerifyAge: false;
    NewLabel: false;
    IsFreeToView: false;
    PinProtect: false;
}

export interface RailResponse {
    Id: string;
    Title: string;
    Params: null; // returns null for now
    Tiles: RailTile[];
}

export interface Rail {
    Id: string;
    Params: string;
    MinRefreshInterval: number;
    Authorized: boolean;
    Service: string;
    IsFreeToView: boolean;
}

export interface RailsResponse {
    RefreshInterval: number;
    Rails: Rail[];
}
