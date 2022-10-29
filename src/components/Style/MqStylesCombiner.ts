import { css, CSSObject, SerializedStyles } from '@emotion/core';

import { Breakpoints } from './Breakpoints';

const breakpoints: Breakpoints[] = [
    Breakpoints.Tablet,
    Breakpoints.TabletLandscape,
    Breakpoints.Desktop,
];

export type BreakpointsStyles = [
    SerializedStyles,
    SerializedStyles?,
    SerializedStyles?,
    SerializedStyles?,
];

export const mqStylesCombiner = (styles: BreakpointsStyles): SerializedStyles => {
    const [style, ...breakpointsStyles] = styles;

    const mqStyles: CSSObject = breakpointsStyles.reduce((acc: CSSObject, cur, i) => {
        if (cur) {
            acc[breakpoints[i]] = cur;
        }
        return acc;
    }, {});

    return css(style, mqStyles);
};
