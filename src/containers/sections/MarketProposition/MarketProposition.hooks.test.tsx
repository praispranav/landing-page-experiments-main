/* eslint-disable jest/no-mocks-import */
import { hookOptionsWithConfig } from '@experiments/__mocks__/MockProviderConfig';
import { renderHook } from '@testing-library/react-hooks';

import { mockedHighlights } from './__mocks__/MarketPropositionMocks';
import { useHighlights } from './MarketProposition.hooks';

describe('Market Proposition Hooks', () => {
    describe('useHighlights', () => {
        it('should return all highlights to be rendered', () => {
            const { result } = renderHook(() => useHighlights(), hookOptionsWithConfig);

            expect(result.current).toStrictEqual(mockedHighlights);
        });
    });
});
