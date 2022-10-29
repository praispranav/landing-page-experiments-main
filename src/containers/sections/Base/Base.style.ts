import colors from '@components/Style/Colors';
import { ThemeEnum } from '@components/Style/Theme';
import css from '@emotion/css';
import { CSSInterpolation } from '@emotion/serialize';
import { BackgroundProperty, ColorProperty } from 'csstype';

// #region theme
interface SectionThemeRules {
    background: BackgroundProperty<string>;
    color: ColorProperty;
}

export const getSectionThemeStyle = (theme: ThemeEnum): CSSInterpolation => {
    const styleProps: Partial<SectionThemeRules> = {};

    switch (theme) {
        case ThemeEnum.Dark:
            styleProps.background = colors.ebony;
            styleProps.color = colors.white;
            break;

        case ThemeEnum.Neon:
            styleProps.background = colors.neon;
            styleProps.color = colors.tarmac;
            break;

        case ThemeEnum.Outline:
            styleProps.color = colors.neon;
            break;

        case ThemeEnum.ExtraDark:
            styleProps.background = colors.tarmac;
            styleProps.color = colors.white;
            break;
    }

    return css(styleProps);
};
// #endregion

export interface BaseSectionStyleProps {
    theme: ThemeEnum;
    continuation?: boolean;
}

export const getBaseSectionStyle = ({
    theme,
    continuation,
}: BaseSectionStyleProps): CSSInterpolation => {
    const baseVerticalPadding = '64px';

    return css(
        {
            paddingTop: baseVerticalPadding,
            paddingBottom: continuation ? '32px' : baseVerticalPadding,
        },
        getSectionThemeStyle(theme),
    );
};
