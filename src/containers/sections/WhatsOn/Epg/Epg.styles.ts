import colors from '@components/Style/Colors';
import { gridMediaQuery } from '@components/Style/Grid';
import { ThemeEnum } from '@components/Style/Theme';
import { fonts } from '@dazn/goat-design-system/lib/cjs/themes/core/fonts';
import { css, SerializedStyles } from '@emotion/core';

export const epgContainerStyle = css({
    minHeight: 720,
    position: 'relative',
});

export const epgHeaderContainerStyle = css(
    {
        position: 'relative',
    },
    gridMediaQuery({
        paddingTop: ['0px', '0px', '0', '48px'],
        'aside > header': {
            justifyContent: [null, null, 'flex-end !important', 'space-between !important'],
        },
        '> aside': {
            left: ['auto', 'auto', 'auto', 0],
            right: [0, 0, 0, 'auto'],
            zIndex: 500,
        },
        '> aside li': {
            paddingRight: 40,
        },
        '> aside li::after': {
            top: 14,
        },
    }),
);

const headerTypography = css`
    span {
        font-size: 12px !important;
        line-height: 20px !important;
        font-family: ${fonts.SECONDARY.fontFamily} !important;
    }

    span:first-of-type {
        font-size: 20px !important;
        line-height: 24px !important;
        font-family: ${fonts.PRIMARY.fontFamily} !important;
    }

    h3 {
        color: ${colors.iron};
        font-size: 16px !important;
        line-height: 20px !important;
        font-family: ${fonts.PRIMARY.fontFamily} !important;
    }
`;

export const epgFilterStyle = headerTypography;

export type ThemeColour = ThemeEnum.ExtraDark | ThemeEnum.Dark;
export const getEpgHeaderStyle = (backgroundVariant: ThemeColour): SerializedStyles => {
    const bgColour = backgroundVariant === ThemeEnum.ExtraDark ? colors.tarmac : colors.ebony
    return css(
        headerTypography,
        {
            borderBottom: `1px solid ${bgColour}`,
            alignItems: 'flex-end',
            paddingTop: 20,
            'div, button': { background: `${bgColour}` },
        },
        gridMediaQuery({
            display: ['block', 'block', 'block', 'flex'],
            flex: '0 1 auto',
            '> div:first-of-type': {
                padding: ['0px 8px 24px', '16px 0px'],
            },
        }),
    )
}
