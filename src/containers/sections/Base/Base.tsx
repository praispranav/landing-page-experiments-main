import { css } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';
import {
    FC,
    forwardRef,
    ForwardRefExoticComponent,
    ReactElement,
    ReactNode,
    Ref,
    RefAttributes,
} from 'react';

import { BaseSectionStyleProps, getBaseSectionStyle } from './Base.style';
import {
    baseContainerGridStyle,
    ContainerStyleProps,
    getContainerStyle,
} from './BaseContainer.style';

type IBaseContainer = {
    style?: CSSInterpolation;
} & ContainerStyleProps;

const Container: FC<IBaseContainer> = ({
    children,
    style,
    center = false,
    grid,
    colStart,
    colEnd,
}) => {
    const baseContainerStyle = css(baseContainerGridStyle, style);
    const baseContainerContentStyle: CSSInterpolation = getContainerStyle({
        center,
        grid,
        colStart,
        colEnd,
    });

    return (
        <div role="region" css={baseContainerStyle}>
            <div css={baseContainerContentStyle}>{children}</div>
        </div>
    );
};

type BaseProps = {
    children: ReactNode;
    style?: CSSInterpolation;
    testId?: string;
} & BaseSectionStyleProps;

export interface BaseCompoundComponent
    extends ForwardRefExoticComponent<BaseProps & RefAttributes<HTMLDivElement>> {
    Container: typeof Container;
}

const BaseComponent = (
    { children, theme, style = {}, continuation = false, testId = '' }: BaseProps,
    ref: Ref<HTMLDivElement>,
): ReactElement => {
    const baseSectionStyle: CSSInterpolation = css(
        getBaseSectionStyle({ theme, continuation }),
        style,
    );

    return (
        <section data-testid={testId} css={baseSectionStyle} ref={ref}>
            {children}
        </section>
    );
};

export const Base = forwardRef(BaseComponent) as unknown as BaseCompoundComponent;

Base.Container = Container;
