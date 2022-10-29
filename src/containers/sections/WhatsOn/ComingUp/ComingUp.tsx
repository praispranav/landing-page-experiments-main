import { getTileImage } from '@hooks/dazn/shared/Tile';
import React, { FC, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { TileTypes } from '../constants';
import { StaticTiles, Tile, TilesGrid } from '../Tiles';
import { useBoxingComingUpTiles } from './ComingUp.hooks';
import { FallbackGrid } from './FallbackGrid';

export const getTileType = (entitlementIds: string[]): TileTypes =>
    entitlementIds && entitlementIds.length > 0 ? TileTypes.PPV : TileTypes.Default;

const ComingUpGrid: FC = () => (
    <TilesGrid>
        {useBoxingComingUpTiles().map(
            ({ eventId, imageId, title, entitlementIds, ...tile }, index) => (
                <Tile
                    {...tile}
                    key={eventId}
                    name={title}
                    image={getTileImage({ imageId, width: 418, height: 222 })}
                    variation={getTileType(entitlementIds)}
                    testid={`FIGHT_CARD_${index}`}
                />
            ),
        )}
        <StaticTiles />
    </TilesGrid>
);

export const ComingUp: FC = () => (
    <ErrorBoundary fallback={<FallbackGrid />}>
        <Suspense fallback={null}>
            <ComingUpGrid />
        </Suspense>
    </ErrorBoundary>
);
