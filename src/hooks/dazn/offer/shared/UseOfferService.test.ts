import { QueryClientWrapper } from '@config/QueryClient';
import { useService } from '@hooks/dazn/UseService';
import { renderHook } from '@testing-library/react-hooks';
import { getCountry } from '@utils/dazn/Region';

import { useOffersService } from './UseOfferService';

jest.mock('@hooks/dazn/UseService');
jest.mock('@utils/dazn/Region');

describe('Service Usage', () => {
    const mockCountry = 'DE';

    beforeEach(() => {
        (getCountry as jest.Mock).mockReturnValue(mockCountry);
    });

    it('should have called the v4 of the RatePlans service', () => {
        renderHook(() => useOffersService(), { wrapper: QueryClientWrapper });

        expect(useService as jest.Mock).toHaveBeenCalledWith(
            { category: 57, name: 'RatePlans', version: 4 },
            {
                method: 'POST',
                body: JSON.stringify({
                    Platform: 'web',
                    Manufacturer: '',
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
                key: mockCountry,
                suspense: true,
                useErrorBoundary: false,
                onError: expect.any(Function),
            },
        );
    });
});
