import { headerStrongFontStyles } from '@components/Fonts/Typography.style';
import { gridMediaQuery } from '@components/Style/Grid';
import { css } from '@emotion/core';

export const titleStyle = css(
    headerStrongFontStyles.strongH4,
    gridMediaQuery({ textAlign: [null, 'center'] }),
);

export const containerStyle = gridMediaQuery({
    padding: ['0', '0', '0 40px', '0 56px'],
    margin: ['0 24px', '0 64px', '0 auto'],
    maxWidth: '1440px',
});
