import { IRailHookRailParams } from '@hooks/dazn/rail/types';

export const BOXING_FIXED_TILES = {
    ClassicFights: 'https://d1sgwhnao7452x.cloudfront.net/Classic Fights.png',
    DocumentariesAndFeatures: 'https://d1sgwhnao7452x.cloudfront.net/Documentaries.png',
    DaznBoxingShow: 'https://d1sgwhnao7452x.cloudfront.net/DAZN BOXING SHOW.png',
    ElPresidente:
        'https://d1sgwhnao7452x.cloudfront.net/Ronaldo-El-Presidente-thumbnail-schedule.jpg',
} as const;

export const BOXING_COMING_UP_PARAMS: IRailHookRailParams = {
    PageType: 'Sport',
    ContentType: 'Sport',
    ContentId: '2x2oqzx60orpoeugkd754ga17',
} as const;

export const BOXING_TILE_TITLES: Record<string, string> = {
    es: 'Noche de Pelea',
    en: 'Fight Night',
} as const;

export enum TileTypes {
    Default = 'DEFAULT',
    PPV = 'PPV',
}
