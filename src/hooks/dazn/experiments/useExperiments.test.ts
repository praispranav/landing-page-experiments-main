import { QueryClientWrapper } from '@config/QueryClient';
import { renderHook } from '@testing-library/react-hooks';

import { ServiceCategories } from '../shared/ServiceCategoriesEnum';
import { useService } from '../UseService';
import { useExperimentVariables } from './useExperiments';

jest.mock('../UseService');

describe('useExperimentVariables', () => {
    it('should call useService with the correct parameters', () => {
        const queryKey = 'en-DE';
        const query: Record<string, string> = {
            $format: 'json',
            languageCode: 'en',
            region: 'DE',
        };

        renderHook(() => useExperimentVariables(), { wrapper: QueryClientWrapper });
        expect(useService).toHaveBeenCalledTimes(1);
        expect(useService).toHaveBeenCalledWith(
            {
                name: 'Experiments',
                category: ServiceCategories.Experiments,
                version: 1,
            },
            {
                key: `experiments-service-${queryKey}`,
                query,
                path: 'strings/experiments',
                onError: expect.any(Function),
            },
        );
    });

    it('should return null on service error', () => {
        (useService as jest.Mock).mockImplementation(() => {
            throw new Error();
        });

        expect(useExperimentVariables()).toBe(undefined);
    });
});
