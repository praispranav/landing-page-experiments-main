import { FC } from 'react';

export interface ImageProps {
    src: string;
    testid: string;
}

export interface TileProps {
    width?: number;
}

export interface TileComposite {
    Footer: FC<FooterProps>;
    Image: FC<ImageProps>;
}

export interface FooterProps {
    title: string;
    subtitle?: string;
}
