import { Icon } from '@components/Icons/Icon';
import { ButtonsThemeEnum } from '@components/Style/Theme';
import { css, SerializedStyles } from '@emotion/core';
import { CSSInterpolation } from '@emotion/serialize';
import { FC, HTMLProps, ReactElement, ReactNode } from 'react';

import {
    buttonsSizeStyle,
    ButtonStyleProps,
    getButtonIconStyle,
    getButtonStyle,
    PositionKeys,
} from './Button.style';

const defaultButtonValues: ButtonStyleProps = {
    theme: ButtonsThemeEnum.PrimaryDarkBg,
    size: buttonsSizeStyle.Large,
};

interface ButtonIconProps {
    position: PositionKeys;
    vector?: string;
    style?: CSSInterpolation;
}

const ButtonIcon: FC<ButtonIconProps> = ({
    children,
    vector,
    position,
    style: propStyle,
    ...props
}) => {
    const iconStyle: SerializedStyles = css(getButtonIconStyle(position), propStyle);

    const icon: ReactNode = vector ? <Icon name={vector} /> : children;

    const testid = vector ? `BUTTON_ICON_${vector.toUpperCase()}` : 'BUTTON_ICON';
    return (
        <i data-testid={testid} css={iconStyle} {...props}>
            {icon}
        </i>
    );
};

interface ButtonComposition {
    Icon: typeof ButtonIcon;
}

type ButtonProps = Partial<ButtonStyleProps> &
    Omit<HTMLProps<HTMLButtonElement | HTMLAnchorElement>, 'size' | 'ref' | 'type'> & {
        icon?: ReactElement;
    };

export const Button: FC<ButtonProps> & ButtonComposition = ({
    children,
    icon,
    href,
    cta = false,
    size = buttonsSizeStyle.Large,
    theme = ButtonsThemeEnum.PrimaryDarkBg,
    ...props
}) => {
    const buttonStyleProps = { cta, size, theme } as ButtonStyleProps;

    const buttonStyle: SerializedStyles = getButtonStyle(buttonStyleProps);

    const ButtonTag = href ? 'a' : 'button';

    return (
        <ButtonTag css={buttonStyle} href={href} {...props}>
            {icon}
            {children}
        </ButtonTag>
    );
};

Button.defaultProps = defaultButtonValues;
Button.Icon = ButtonIcon;
