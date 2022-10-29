import { QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { spyUseService } from '@hooks/dazn/__mocks__/MockUseService';
import { renderHook } from '@testing-library/react-hooks';
// eslint-disable-next-line jest/no-mocks-import
import { mockServiceDictionary } from '@utils/dazn/__mocks__/MockService';
import * as daznRegion from '@utils/dazn/Region';
import * as daznService from '@utils/dazn/Service';

// eslint-disable-next-line jest/no-mocks-import
import { faqResponseDE } from './__mocks__/faqResponseDE';
// eslint-disable-next-line jest/no-mocks-import
import { getFaqArticlesMock } from './__mocks__/MockUseFaq';
import { useFaq } from './UseFaq';

describe('UseFaq', () => {
    const mockLocale = 'en-us';

    beforeEach(() => {
        const mockServicePath = new URL(mockServiceDictionary.Help.Versions.v1.ServicePath);
        jest.spyOn(daznService, 'getServicePath').mockReturnValue(mockServicePath);

        jest.spyOn(daznRegion, 'getLocale').mockReturnValue(mockLocale);
    });

    const hookOptions = { wrapper: QueryClientWrapper };
    test('the hook should have called the Help endpoint', () => {
        const spiedUseService = spyUseService({ data: faqResponseDE });

        renderHook(() => useFaq(), hookOptions);
        expect(spiedUseService).toHaveBeenCalledWith(
            { category: 119, name: 'Help', version: 1 },
            {
                key: mockLocale,
                path: `${mockLocale}/categories/faq`,
                onError: expect.any(Function),
            },
        );
    });

    test('the hook should return the mocked articles with the mapped url', () => {
        spyUseService({ data: faqResponseDE });

        const { result } = renderHook(() => useFaq(), hookOptions);
        const expectedArticles = getFaqArticlesMock(mockLocale);

        expect(result.current).toStrictEqual(expectedArticles);
    });
});
