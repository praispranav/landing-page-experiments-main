import React, { FC } from 'react';

import { Footer } from './Footer';
import { Image } from './Image';
import { getTileStyle } from './Tile.style';
import { TileComposite, TileProps } from './types';

export const Tile: FC<TileProps> & TileComposite = ({ width, children }) => {
    const tileStyle = getTileStyle({ width });
    return (
        <div data-testid="TILE" css={tileStyle}>
            {children}
        </div>
    );
};

Tile.Image = Image;
Tile.Footer = Footer;
