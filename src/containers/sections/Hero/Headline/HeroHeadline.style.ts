import { headerStrongFontStyles } from '@components/Fonts/Typography.style';
import colors from '@components/Style/Colors';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { css } from '@emotion/core';

const titleMargin = css`
    & + * {
        margin-top: 24px;
    }
`;

export const headlineStyle = mqStylesCombiner([
    css(headerStrongFontStyles.strongH4, titleMargin, {
        color: colors.chalk,
        whiteSpace: 'pre-wrap',
    }),
    headerStrongFontStyles.strongH3,
]);
