import { buttonFontStyles } from '@components/Fonts/Typography.style';
import colors from '@components/Style/Colors';
import { gridMediaQuery } from '@components/Style/Grid';
import { ButtonsThemeEnum } from '@components/Style/Theme';
import { css, CSSObject, SerializedStyles } from '@emotion/core';
import { DynamicStyle } from 'facepaint';

export enum ButtonSize {
    XLarge = 'XLarge',
    Large = 'Large',
    Medium = 'Medium',
    Small = 'Small',
}

export const buttonsSizeStyle: Record<ButtonSize, SerializedStyles> = {
    [ButtonSize.Small]: css({ padding: '6px 16px' }, buttonFontStyles.buttonSmall),
    [ButtonSize.Medium]: css({ padding: '14px 16px' }, buttonFontStyles.buttonLargeMedium),
    [ButtonSize.Large]: css({ padding: '20px 24px' }, buttonFontStyles.buttonLargeMedium),
    [ButtonSize.XLarge]: css({ padding: '22px 32px' }, buttonFontStyles.buttonXLarge),
} as const;

const buttonStyleReset = css`
    border: none;
    padding: 0;
    width: auto;
    overflow: visible;

    background: transparent;

    /* inherit font & color from ancestor */
    color: inherit;
    font: inherit;

    /* Normalize \`line-height\`. Cannot be changed from \`normal\` in Firefox 4+. */
    line-height: normal;

    /* Corrects font smoothing for webkit */
    -webkit-font-smoothing: inherit;
    -moz-osx-font-smoothing: inherit;

    /* Corrects inability to style clickable \`input\` types in iOS */
    -webkit-appearance: none;
`;

const baseStyle = css(buttonStyleReset, {
    textTransform: 'uppercase',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
});

export interface ButtonStyleProps {
    size: SerializedStyles;
    cta?: boolean;
    theme: ButtonsThemeEnum;
}

export type PositionKeys = 'left' | 'right';

export const getButtonIconStyle = (position: PositionKeys): SerializedStyles => {
    const marginProperty = position === 'left' ? 'marginRight' : 'marginLeft';
    const order = position === 'left' ? 0 : 1;

    return css({
        order,
        fontStyle: 'normal',
        lineHeight: 1,
        color: 'inherit',
        [marginProperty]: '8px',
    });
};

const PSEUDO_HOVER = ':hover';
type ColorsKeys = keyof typeof colors;
type Colors = typeof colors[ColorsKeys];

const getPrimaryThemeStyle = (background: Colors, color: Colors): CSSObject => {
    const buttonStyle: CSSObject = {};

    buttonStyle.background = background;
    buttonStyle.color = color;
    buttonStyle[PSEUDO_HOVER] = { opacity: 0.7 };

    return buttonStyle;
};

const getSecondaryThemeStyle = (background: Colors, hoverBackground: Colors): CSSObject => {
    const buttonStyle: CSSObject = {};

    buttonStyle.background = background;
    buttonStyle.color = colors.chalk;
    buttonStyle[PSEUDO_HOVER] = { background: hoverBackground };

    return buttonStyle;
};

const getOutlineThemeStyle = (background: Colors, hoverFontColor: Colors): CSSObject => {
    const buttonStyle: CSSObject = {};

    buttonStyle.border = '2px solid';
    buttonStyle.borderColor = background;
    buttonStyle.background = 'transparent';
    buttonStyle.color = background;
    buttonStyle.boxSizing = 'border-box';
    buttonStyle[PSEUDO_HOVER] = { background, color: hoverFontColor };

    return buttonStyle;
};

const getButtonThemeStyle = (theme: ButtonsThemeEnum): SerializedStyles => {
    let buttonStyle: CSSObject = {};

    switch (theme) {
        case ButtonsThemeEnum.PrimaryDarkBg:
            buttonStyle = getPrimaryThemeStyle(colors.neon, colors.tarmac);
            break;

        case ButtonsThemeEnum.SecondaryDarkBg:
            buttonStyle = getSecondaryThemeStyle(colors.mako, colors.asphalt);
            break;

        case ButtonsThemeEnum.OutlineDarkBg:
            buttonStyle = getOutlineThemeStyle(colors.chalk, colors.tarmac);
            break;

        case ButtonsThemeEnum.TextDarkBg:
            buttonStyle.background = colors.tarmac;
            buttonStyle.color = colors.chalk;
            buttonStyle[PSEUDO_HOVER] = { background: colors.ebony };
            break;

        case ButtonsThemeEnum.PrimaryLightBg:
            buttonStyle = getPrimaryThemeStyle(colors.tarmac, colors.chalk);
            break;

        case ButtonsThemeEnum.SecondaryLightBg:
            buttonStyle = getSecondaryThemeStyle(colors.asphalt, colors.concrete);
            break;

        case ButtonsThemeEnum.OutlineLightBg:
            buttonStyle = getOutlineThemeStyle(colors.tarmac, colors.chalk);
            break;

        case ButtonsThemeEnum.TextLightBg:
            buttonStyle.background = colors.chalk;
            buttonStyle.color = colors.tarmac;
            buttonStyle[PSEUDO_HOVER] = { background: colors.asphalt, color: colors.chalk };
            break;
    }

    return css(buttonStyle);
};

const getButtonCtaStyle = (cta: boolean): DynamicStyle[] => {
    const ctaWidthRule = [
        // < 768px
        '100%',

        // > 768px
        'auto',
    ];

    return gridMediaQuery({
        width: cta ? ctaWidthRule : 'auto',
    });
};

export const getButtonStyle = ({
    size,
    theme,
    cta = false,
}: ButtonStyleProps): SerializedStyles => {
    const shapeStyle: DynamicStyle[] = getButtonCtaStyle(cta);
    const themeStyle: SerializedStyles = getButtonThemeStyle(theme);

    return css(baseStyle, themeStyle, shapeStyle, size);
};
