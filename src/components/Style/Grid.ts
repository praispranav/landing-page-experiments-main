import { css } from '@emotion/core';
import { GridTemplateProperty } from 'csstype';
import facepaint from 'facepaint';

import { Breakpoints } from './Breakpoints';

export const gridMediaQuery = facepaint([
    Breakpoints.Tablet,
    Breakpoints.TabletLandscape,
    Breakpoints.Desktop,
]);

const gridTemplateColumns: GridTemplateProperty[] = [
    'repeat(4,  1fr)',
    'repeat(8,  1fr)',
    'repeat(12, 1fr)',
    'repeat(16, 1fr)',
];

export const gridTemplateStyle = css(gridMediaQuery({ gridTemplateColumns }), {
    display: 'grid',
    columnGap: '16px',
});
