declare module '@dazn/discovery-web-module-utils' {
    import { RailTile, RailTypeKeys } from 'types/dazn/Rail/Rail';

    type LabelKeys = 'LIVE' | 'LIVE_SOON' | 'TEASER' | 'AGE_RESTRICTION' | 'FREETOVIEW' | 'NEW';

    export function getLabels(
        railType: RailTypeKeys,
        tile: RailTile,
        isFreeToViewFeatureToggleEnabled: boolean,
        isPayPerViewTile: boolean,
    ): LabelKeys[];
}
