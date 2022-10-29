import { FC } from 'react';

import { sportsGridItemStyle } from './SportsLogo.style';

interface LogoProps {
    src: string;
    name: string;
}

export const SportsLogo: FC<LogoProps> = ({ src, name }) => (
    <img
        css={sportsGridItemStyle}
        src={src}
        data-testid="SPORTS_LOGO"
        width="80"
        height="80"
        alt={name}
    />
);
