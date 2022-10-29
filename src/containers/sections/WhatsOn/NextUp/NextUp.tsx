import { getTileImage } from '@hooks/dazn/shared/Tile';
import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import ComingUp from '../ComingUp';
import { TileTypes } from '../constants';
import { StaticTiles, Tile, TilesGrid } from '../Tiles';
import { useNextUpTiles } from './NextUp.hooks';

export const getTileType = (entitlementIds: string[]): TileTypes =>
    entitlementIds && entitlementIds.length > 0 ? TileTypes.PPV : TileTypes.Default;

interface RailProps {
    railId: string;
}

const NextUpGrid: FC<RailProps> = ({ railId }) => (
    <TilesGrid>
        {useNextUpTiles(railId).map(
            ({ eventId, imageId, title, entitlementIds, ...tile }, index) => (
                <Tile
                    {...tile}
                    key={eventId}
                    name={title}
                    image={getTileImage({ imageId, width: 418, height: 222 })}
                    variation={getTileType(entitlementIds)}
                    testid={`NEXT_UP_CARD_${index}`}
                />
            ),
        )}
        <StaticTiles />
    </TilesGrid>
);

export const NextUp: FC<RailProps> = ({ railId }) => (
    <ErrorBoundary fallback={<ComingUp />}>
        <Suspense fallback={null}>
            <NextUpGrid railId={railId} />
        </Suspense>
    </ErrorBoundary>
);
