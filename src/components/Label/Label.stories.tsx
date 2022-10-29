import { Story } from '@storybook/react';

import { Label } from './Label';
import { LabelColors, LabelProps, LabelSizes } from './types';

const Template: Story<LabelProps> = (args) => <Label {...args}>Label here</Label>;

export default {
    title: 'Components/Labels',
    argTypes: {
        backgroundColor: {
            control: {
                type: 'select',
                options: Object.values(LabelColors),
            },
        },
        size: {
            control: {
                type: 'select',
                options: Object.values(LabelSizes),
            },
        },
    },
};

export const Default = Template.bind({});
Default.args = {
    backgroundColor: LabelColors.neon,
    size: LabelSizes.small,
};
