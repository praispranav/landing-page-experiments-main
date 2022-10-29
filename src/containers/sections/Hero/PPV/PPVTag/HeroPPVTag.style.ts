import { ppvFontStyles } from '@components/Fonts/Typography.style';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { css } from '@emotion/core';

export const heroPPVTagStyle = css(
    { marginBottom: 8, display: 'inline-block' },
    mqStylesCombiner([ppvFontStyles.medium, ppvFontStyles.large]),
);
