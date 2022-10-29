import { Label } from '@components/Label/Label';
import { LabelColors, LabelSizes } from '@components/Label/types';
import { FC } from 'react';

export const HeroPriceHighlight: FC = ({ children }) => (
    <Label
        backgroundColor={LabelColors.gloves}
        size={LabelSizes.large}
        data-testid="HERO_PRICE_HIGHLIGHT"
    >
        {children}
    </Label>
);
