import React, { FC } from 'react';

import { subtitleStyle, tileFooterStyle, titleStyle } from './Tile.style';
import { FooterProps } from './types';

export const Footer: FC<FooterProps> = ({ title, subtitle }) => (
    <div css={tileFooterStyle}>
        <span css={titleStyle}>{title}</span>
        {subtitle && <span css={subtitleStyle}>{subtitle}</span>}
    </div>
);
