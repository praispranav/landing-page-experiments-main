import { css } from '@emotion/react';
import { SerializedStyles } from '@emotion/utils';

const gap = '4px';
export const getSportsGridStyle = (): SerializedStyles =>
    css({
        gridColumn: '1 / -1',
        overflow: 'hidden',
        position: 'relative',
        // This should be 32px, but because of the 4px gap, it needs to be 28
        marginTop: '28px',
        display: 'flex',
        flexWrap: 'wrap',
        // Hack to fix flexbox gap: https://coryrylan.com/blog/css-gap-space-with-flexbox
        '> *': {
            margin: `${gap} 0 0 ${gap}`,
        },
        marginLeft: `-${gap}`,
        width: `calc(100% + ${gap})`,
    });
