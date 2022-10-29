import { TileTypes } from '../constants';

export interface TileBaseProps {
    name: string;
    image: string;
    width?: number;
    subtitle?: string;
}
export interface TileVariationProps extends TileBaseProps {
    testid: string;
}

export interface TileProps extends TileBaseProps {
    testid?: string;
    variation?: TileTypes;
}
