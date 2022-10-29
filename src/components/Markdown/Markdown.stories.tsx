import { Story } from '@storybook/react';

import { Markdown, OpenTags, ReservedTags } from './Markdown';

export default {
    component: Markdown,
    title: 'Components/Markdown',
    argTypes: {
        markdown: {
            control: {
                type: 'text',
            },
        },
        tag: {
            control: {
                options: OpenTags,
                type: 'inline-radio',
            },
        },
    },
};

const Template: Story = ({ markdown, tag }) => <Markdown markdown={markdown} tag={tag} />;

export const Default = Template.bind({});

Default.args = {
    markdown: 'Already a  \nsubscriber? [Sign in]( /signin )',
    tag: ReservedTags.H1,
};
