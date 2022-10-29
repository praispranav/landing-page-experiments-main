import { headerFontStyles } from '@components/Fonts/Typography.style';
import colors from '@components/Style/Colors';
import { css } from '@emotion/core';

export const leadStyle = css(headerFontStyles.headerRegular6, {
    whiteSpace: 'pre-wrap',
    marginTop: 0,
    marginBottom: 24,
    color: colors.iron,
});
