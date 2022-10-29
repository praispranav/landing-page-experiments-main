import { useDefaultLogoSet } from '@hooks/dazn/spolo/UseSpolo';
import { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { SportsLogo } from '../SportsLogo/SportsLogo';
import { getSportsGridStyle } from './SportsGrid.style';

export const SportsLogos: FC = () => {
    const logosList = useDefaultLogoSet();

    if (!logosList.length) {
        return null;
    }

    const sportsLogos = logosList.map(({ url, name }) => (
        <SportsLogo key={url} src={url} name={name} />
    ));

    const sportsGridStyle = getSportsGridStyle();

    return (
        <div css={sportsGridStyle} data-testid="SPORTS_GRID">
            {sportsLogos}
        </div>
    );
};

export const SportsGrid: FC = () => (
    <ErrorBoundary fallback={<div data-testid="SPORTS_GRID_FALLBACK" />}>
        <Suspense fallback={null}>
            <SportsLogos />
        </Suspense>
    </ErrorBoundary>
);
