import { renderHook } from '@testing-library/react-hooks';

import { usePageViewTracking } from './usePageViewTracking';

jest.mock('@utils/dazn/Region');
import { getCountry, getCurrency, getLanguage } from '@utils/dazn/Region';

jest.mock('@dazn/fe-events');
import { triggerVirtualPageViewEvent, VirtualPageViewEvent } from '@dazn/fe-events';

describe('GA tracking', () => {
    beforeEach(() => {
        (getCountry as jest.Mock).mockReturnValue('de');
        (getLanguage as jest.Mock).mockReturnValue('en');
        (getCurrency as jest.Mock).mockReturnValue('eur');
    });

    it('should trigger fe-events "triggerVirtualPageViewEvent"', () => {
        const event: VirtualPageViewEvent = {
            page: {
                category: 'landingpage',
                title: '',
                url: global.location.origin,
                path: global.location.pathname,
                type: '',
                country: 'de',
                language: 'en',
            },
        };
        renderHook(() => usePageViewTracking());
        expect(triggerVirtualPageViewEvent).toBeCalledWith(event);
    });
});
