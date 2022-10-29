import { FC } from 'react';

import { getLabelStyle } from './Label.style';
import { LabelProps } from './types';

export const Label: FC<LabelProps> = ({ size, backgroundColor, children, ...args }) => (
    <span css={getLabelStyle({ size, backgroundColor })} {...args}>
        {children}
    </span>
);
