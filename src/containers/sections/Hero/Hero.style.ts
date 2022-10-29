import { gridMediaQuery } from '@components/Style/Grid';
import { css } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';

export const heroBaseStyle: CSSInterpolation = gridMediaQuery({
    position: 'relative',
    overflow: 'hidden',
    paddingTop: ['200px', '360px', '100px'],
});

export const heroContainerStyle: CSSInterpolation = css({
    position: 'relative',
    zIndex: 10,
});

export const headingSectionStyle = css(
    {
        position: 'relative',
        gridColumnStart: 1,
    },
    gridMediaQuery({
        gridColumnEnd: ['-1', '-1', '8', '9'],
    }),
);

export const bodySectionStyle = css({
    gridColumn: '1 / -1',
    position: 'relative',
    'p:first-child': {
        marginTop: 0,
    },
});
