import { Meta, Story } from '@storybook/react';
import { useXhrMocks } from '@utils/__mocks__/UseXhrMocks';

import { Faq as FaqSection } from '../Faq';
import { mockFaq, mockStatus } from './MockedResponse';

export const Faq: Story = ({ status }) => {
    useXhrMocks([mockFaq(status)]);

    return <FaqSection key={status} />;
};

export default {
    title: 'Sections/Faq',
    component: Faq,

    argTypes: {
        status: {
            control: {
                type: 'select',
                options: mockStatus,
            },
        },
    },

    args: {
        status: 'loaded',
    },
} as Meta;
