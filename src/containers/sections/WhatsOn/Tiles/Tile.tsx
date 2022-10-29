import { Label } from '@components/Label/Label';
import { LabelColors, LabelSizes } from '@components/Label/types';
import { Tile } from '@components/Tile';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import * as FeLabelsReact from '@dazn/fe-labels-react';
import {
    useLocalisedStringKey,
    useResourceStringKey,
} from '@hooks/resourceStrings/UseLocalisedStrings';
import React, { FC } from 'react';

import { TileTypes } from '../constants';
import { ppvTag, ppvTagBorder, ppvText, subscribeNow } from './Tile.style';
import { TileProps, TileVariationProps } from './types';

const StandardTile: FC<TileVariationProps> = ({ name, subtitle, testid, width, image }) => (
    <Tile width={width}>
        <Tile.Image src={image} testid={`IMAGE_${testid}`} />
        <Tile.Footer title={name} subtitle={subtitle} />
    </Tile>
);

const PPVTile: FC<TileVariationProps> = ({ name, subtitle, testid, width, image }) => (
    <Tile width={width}>
        <Tile.Image src={image} testid={`IMAGE_${testid}`}>
            <Label
                css={subscribeNow}
                backgroundColor={LabelColors.chalk}
                size={LabelSizes.large}
                data-testid="PPV_TILE_TEXT"
            >
                {useLocalisedStringKey(ResourceStringsKeys.PPVTagSubscribe)}
            </Label>
            <div data-testid="PPV_TAG" css={ppvTag}>
                <div css={ppvTagBorder} />
                <FeLabelsReact.Label
                    id="PPV_TAG_TEXT"
                    as="div"
                    stringKey={useResourceStringKey(ResourceStringsKeys.PPVlabel)}
                    css={ppvText}
                />
            </div>
        </Tile.Image>
        <Tile.Footer title={name} subtitle={subtitle} />
    </Tile>
);

export const WhatsOnTile: FC<TileProps> = (props) => {
    const { variation = TileTypes.Default, name, testid = name, ...rest } = props;

    const tileVariation = {
        [TileTypes.Default]: <StandardTile name={name} testid={testid} {...rest} />,
        [TileTypes.PPV]: <PPVTile name={name} testid={testid} {...rest} />,
    };

    return tileVariation[variation] ?? tileVariation[TileTypes.Default];
};
