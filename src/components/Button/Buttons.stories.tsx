import { ButtonsThemeEnum } from '@components/Style/Theme';
import { Story } from '@storybook/react';

import { Button } from './Button';
import { ButtonSize, buttonsSizeStyle } from './Button.style';

const Template: Story<{
    theme: ButtonsThemeEnum;
    size: ButtonSize;
    icon: boolean;
    cta: boolean;
}> = ({ theme, size, icon, cta }) => {
    const Icon = icon ? <Button.Icon position="right" vector="external_link" /> : undefined;

    return (
        <Button theme={theme} size={buttonsSizeStyle[size]} icon={Icon} cta={cta}>
            start your free month
        </Button>
    );
};

export default {
    title: 'Components/Buttons',
    argTypes: {
        theme: {
            control: {
                type: 'select',
                options: Object.values(ButtonsThemeEnum),
            },
        },
        size: {
            control: {
                type: 'select',
                options: Object.values(ButtonSize),
            },
        },
    },
};

export const Default = Template.bind({});

Default.args = {
    theme: ButtonsThemeEnum.PrimaryDarkBg,
    size: ButtonSize.Large,
    icon: false,
    cta: false,
};
