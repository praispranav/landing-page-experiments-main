import { labelFontStyles } from '@components/Fonts/Typography.style';
import colors from '@components/Style/Colors';
import { css, SerializedStyles } from '@emotion/react';

import { LabelColors, LabelProps } from './types';

export function getLabelStyle(props: LabelProps): SerializedStyles {
    const labelColorStyle = {
        [LabelColors.gloves]: css({
            backgroundColor: colors.gloves,
            color: colors.chalk,
        }),
        [LabelColors.neon]: css({
            backgroundColor: colors.neon,
            color: colors.tarmac,
        }),
        [LabelColors.chalk]: css({
            backgroundColor: colors.chalk,
            color: colors.tarmac,
        }),
    };

    return css(
        {
            textTransform: 'uppercase',
            padding: props.size === 'small' ? '2px 6px' : '5px 6px',
            alignSelf: 'baseline',
        },
        labelColorStyle[props.backgroundColor],
        props.size === 'small' ? labelFontStyles.labelSmall : labelFontStyles.label,
    );
}
