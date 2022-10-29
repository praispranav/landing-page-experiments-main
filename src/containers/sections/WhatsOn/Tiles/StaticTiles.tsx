import React, { FC } from 'react';

import { BOXING_FIXED_TILES } from '../constants';
import { Tile } from './';

export const StaticTiles: FC = () => (
    <>
        <Tile
            testid="TILE_BOXING_NEWS"
            name="Boxing news, debates and interviews"
            image={BOXING_FIXED_TILES.DaznBoxingShow}
        />

        <Tile
            testid="TILE_EL_PRESIDENTE"
            name="Ronaldo: El Presidente"
            image={BOXING_FIXED_TILES.ElPresidente}
        />

        <Tile
            testid="TILE_DAZN_ORIGINALS"
            name="Award-winning DAZN Originals"
            image={BOXING_FIXED_TILES.DocumentariesAndFeatures}
        />

        <Tile
            testid="TILE_CLASSIC_FIGHTS"
            name="Archive – 30 years of classic fights"
            image={BOXING_FIXED_TILES.ClassicFights}
        />
    </>
);
