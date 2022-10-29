import colors from '@components/Style/Colors';
import { fonts } from '@dazn/goat-design-system/lib/cjs/themes/core/fonts';
import { css } from '@emotion/core';
import type { FontWeightProperty } from 'csstype';

const headerTrim = css({
    margin: '0 0 24px',
    fontWeight: fonts.PRIMARY.weight.FW700 as FontWeightProperty,
    fontFamily: fonts.PRIMARY.fontFamily,
    color: colors.chalk,
});

const titleMargin = css`
    & + * {
        margin-top: 32px;
    }
`;

const headerCondensed = css(
    {
        margin: '0 0 24px',
        textTransform: 'uppercase',
        fontWeight: fonts.TERTIARY.weight.FW700 as FontWeightProperty,
        fontFamily: fonts.TERTIARY.fontFamily,
        color: colors.chalk,
    },
    titleMargin,
);

const bodyOscine = css({
    fontFamily: fonts.SECONDARY.fontFamily,
    fontWeight: fonts.SECONDARY.weight.FW700 as FontWeightProperty,
    color: colors.chalk,
});

const buttonTrim = css({
    fontFamily: fonts.PRIMARY.fontFamily,
    fontWeight: fonts.PRIMARY.weight.FW700 as FontWeightProperty,
});

const LabelOscine = css({
    fontFamily: fonts.SECONDARY.fontFamily,
    fontWeight: fonts.SECONDARY.weight.FW800 as FontWeightProperty,
});

export const headerFontStyles = {
    header1: css(headerTrim, { fontSize: '48px', lineHeight: '56px' }),
    header2: css(headerTrim, { fontSize: '32px', lineHeight: '36px' }),
    header3: css(headerTrim, { fontSize: '24px', lineHeight: '28px' }),
    header4: css(headerTrim, { fontSize: '20px', lineHeight: '24px' }),
    header5: css(headerTrim, { fontSize: '18px', lineHeight: '24px' }),
    header6: css(headerTrim, { fontSize: '16px', lineHeight: '20px' }),
    headerRegular6: css(headerTrim, {
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: fonts.PRIMARY.weight.FW400 as FontWeightProperty,
    }),
} as const;

export const headerStrongFontStyles = {
    strongH1: css(headerCondensed, {
        fontSize: '112px',
        lineHeight: '94px',
        letterSpacing: '0.02em',
    }),
    strongH2: css(headerCondensed, {
        fontSize: '96px',
        lineHeight: '80px',
        letterSpacing: '0.02em',
    }),
    strongH3: css(headerCondensed, {
        fontSize: '72px',
        lineHeight: '70px',
        letterSpacing: '0.02em',
    }),
    strongH4: css(headerCondensed, {
        fontSize: '48px',
        lineHeight: '50px',
        letterSpacing: '0.02em',
    }),
} as const;

export const bodyFontStyles = {
    body1: css(bodyOscine, { fontSize: '16px', lineHeight: '24px' }),
    body2: css(bodyOscine, { fontSize: '14px', lineHeight: '20px' }),
    body3: css(bodyOscine, { fontSize: '12px', lineHeight: '20px' }),
    bodyRegular1: css(bodyOscine, {
        fontSize: '16px',
        lineHeight: '24px',
        fontWeight: fonts.SECONDARY.weight.FW400 as FontWeightProperty,
    }),
    bodyRegular2: css(bodyOscine, {
        fontSize: '14px',
        lineHeight: '20px',
        fontWeight: fonts.SECONDARY.weight.FW400 as FontWeightProperty,
    }),
    bodyRegular3: css(bodyOscine, {
        fontSize: '12px',
        lineHeight: '20px',
        fontWeight: fonts.SECONDARY.weight.FW400 as FontWeightProperty,
    }),
} as const;

export const buttonFontStyles = {
    buttonXLarge: css(buttonTrim, { fontSize: '18px', lineHeight: '20px' }),
    buttonLargeMedium: css(buttonTrim, { fontSize: '16px', lineHeight: '12px' }),
    buttonSmall: css(buttonTrim, { fontSize: '14px', lineHeight: '20px' }),
} as const;

export const labelFontStyles = {
    label: css(LabelOscine, { fontSize: '14px', lineHeight: '15px' }),
    labelSmall: css(LabelOscine, { fontSize: '12px', lineHeight: '13px' }),
} as const;

const ppvGoldenGradient = css({
    color: colors.neon,
    background: 'linear-gradient(90deg, #CFA120 0%, #FBED7D 50%, #CF9F20 100%)',
    WebkitTextFillColor: 'transparent',
    WebkitBackgroundClip: 'text',
});

const ppvFont = css({
    fontFamily: fonts.PRIMARY.fontFamily,
    fontWeight: fonts.PRIMARY.weight.FW800 as FontWeightProperty,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
});

export const ppvFontStyles = {
    large: css(ppvFont, ppvGoldenGradient, { fontSize: '18px', lineHeight: '21px' }),
    medium: css(ppvFont, ppvGoldenGradient, { fontSize: '16px', lineHeight: '19px' }),
    small: css(ppvFont, ppvGoldenGradient, { fontSize: '14px', lineHeight: '16px' }),
} as const;
