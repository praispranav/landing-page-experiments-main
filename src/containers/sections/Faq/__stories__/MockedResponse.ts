// eslint-disable-next-line jest/no-mocks-import
import { faqResponseDE } from '@hooks/dazn/help/__mocks__/faqResponseDE';
// eslint-disable-next-line jest/no-mocks-import
import { IMock } from '@utils/__mocks__/UseXhrMocks';
import { delay } from 'xhr-mock';
import { Mock } from 'xhr-mock/lib/types';

export type FaqStatusKeys = 'loaded' | 'loading' | 'failed';
export const mockStatus: FaqStatusKeys[] = ['loaded', 'loading', 'failed'];

const mockFaqResponse = (status: FaqStatusKeys): Mock => {
    if (status === 'failed') {
        return { body: JSON.stringify({}) };
    }

    if (status === 'loading') {
        return delay({ body: JSON.stringify(faqResponseDE) }, 30000);
    }

    return { body: JSON.stringify(faqResponseDE) };
};

export const mockFaq = (status: FaqStatusKeys): IMock => ({
    method: 'GET',
    url: /categories\/faq$/,
    response: mockFaqResponse(status),
});
