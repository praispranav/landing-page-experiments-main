import { gridMediaQuery } from '@components/Style/Grid';
import { ThemeEnum } from '@components/Style/Theme';
import { getSectionThemeStyle } from '@containers/sections/Base/Base.style';
import { css } from '@emotion/core';

export const footerStyle = css(
    {
        a: {
            textDecoration: 'none',
        },
    },
    gridMediaQuery({
        paddingBottom: ['96px', '0px'],
    }),
    getSectionThemeStyle(ThemeEnum.Dark),
);
