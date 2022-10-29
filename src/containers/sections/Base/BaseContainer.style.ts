import { gridMediaQuery, gridTemplateStyle } from '@components/Style/Grid';
import { css } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';
import { GridColumnProperty, TextAlignLastProperty } from 'csstype';

export const baseContainerGridStyle: CSSInterpolation = css(
    gridTemplateStyle,
    gridMediaQuery({
        margin: ['0 24px', '0 64px', '0 auto'],
    }),
    {
        maxWidth: '1440px',
    },
);

type ContainerStyleType = TextAlignLastProperty | null;
const getContainerAlignStyle = (center: boolean): ContainerStyleType[] => {
    // < 768px
    const styleAlignment: ContainerStyleType[] = [null];

    if (!center) {
        return styleAlignment;
    }

    // > 768px
    styleAlignment.push('center');
    return styleAlignment;
};

export interface ContainerStyleProps {
    center?: boolean;
    grid?: boolean;
    colStart?: GridColumnProperty[];
    colEnd?: GridColumnProperty[];
}

export const columnsStart: GridColumnProperty[] = ['1', '1', '2'];
export const columnsEnd: GridColumnProperty[] = ['-1', '-1', '-2'];

export const getContainerStyle = ({
    center = false,
    colStart = columnsStart,
    colEnd = columnsEnd,
    grid = false,
}: ContainerStyleProps): CSSInterpolation =>
    css(
        grid ? gridTemplateStyle : null,
        gridMediaQuery({
            gridColumnStart: colStart,
            gridColumnEnd: colEnd,
            textAlign: getContainerAlignStyle(center),
        }),
    );
