import { css } from '@emotion/core';
import { SerializedStyles } from '@emotion/react';
import { FC } from 'react';

const getRandomFloat = (min: number, max: number): number => Math.random() * (max - min) + min;

const getRandomColor = (): string => Math.floor(getRandomFloat(100, 999)).toString();

export const BelowHeaderStorySection: FC = ({ children, ...props }) => {
    const gradient = `linear-gradient(to bottom, #${getRandomColor()}, #${getRandomColor()})`;

    const style: SerializedStyles = css({
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 700,
        background: gradient,
    });

    return (
        <div {...props} css={style}>
            {children}
        </div>
    );
};
