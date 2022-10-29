import { FC } from 'react';

import { TilesGrid } from '../Tiles';
import { StaticTiles } from '../Tiles/StaticTiles';

export const FallbackGrid: FC = () => (
    <TilesGrid>
        <StaticTiles />
    </TilesGrid>
);
