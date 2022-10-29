import { fonts } from '@dazn/goat-design-system/lib/cjs/themes/core/fonts';
import { css } from '@emotion/core';

const tilesTypography = css`
    a {
        text-decoration: none;
    }

    p {
        font-size: 14px !important;
        line-height: 16px !important;
        font-family: ${fonts.PRIMARY.fontFamily} !important;
    }

    h4 {
        font-size: 16px !important;
        line-height: 20px !important;
        font-family: ${fonts.PRIMARY.fontFamily} !important;
    }
`;

export const scheduleGridStyle = css(tilesTypography, {
    a: {
        cursor: 'default',
        ':focus': {
            outline: 'none',
        },
    },
    header: { cursor: 'default' },
    article: {
        padding: '8px 8px 16px 8px',
    },
    section: {
        paddingLeft: '0',
        paddingRight: '0',
    },
});
