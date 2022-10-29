import React, { FC } from 'react';

import { imageStyle, pictureStyle } from './Tile.style';
import { ImageProps } from './types';

export const Image: FC<ImageProps> = ({ src, testid, children }) => (
    <picture css={pictureStyle}>
        <img data-testid={testid} src={src} css={imageStyle} />
        {children}
    </picture>
    );
