import { css } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';
import { FC } from 'react';

import { useIcon } from './Icon.hooks';

interface IconProps {
    name: string;
    style?: CSSInterpolation;
}

export const Icon: FC<IconProps> = ({ name, style, ...props }) => {
    const iconSrc = useIcon(name);
    const iconStyle = css(
        {
            display: 'inline-block',
            verticalAlign: 'middle',
        },
        style,
    );

    if (!iconSrc) {
        return null;
    }

    return <img {...props} role="img" css={iconStyle} src={iconSrc} alt={name} />;
};
