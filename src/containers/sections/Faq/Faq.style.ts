import { headerStrongFontStyles } from '@components/Fonts/Typography.style';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { css } from '@emotion/react';

export const articlesContainerStyle = css({
    padding: 0,
    listStyle: 'none',
});

export const titleStyle = mqStylesCombiner([
    headerStrongFontStyles.strongH4,
    headerStrongFontStyles.strongH3,
]);
