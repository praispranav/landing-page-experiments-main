/* eslint-disable jest/no-mocks-import */

import { ElementSettingKeys } from '@config/ConfigsKeys';
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { MockVariantConfig } from '@experiments/__mocks__/MockVariantConfig';
import { waitFor } from '@testing-library/react';

import { MarketProposition as MarketPropositionWrapper } from '.';

jest.mock('./MarketProposition');

import { MarketProposition } from './MarketProposition';

describe('Market Proposition Wrapper', () => {
    describe('Error Boundary', () => {
        it('should render an empty div when an error is thrown', async () => {
            const render = renderWithVariantConfig({
                ...MockVariantConfig,
                elements: {
                    [ElementSettingKeys.MarketPropositionSection]: true,
                },
            });

            (MarketProposition as jest.Mock).mockImplementation(() => {
                throw new Error('TEST MARKET_PROPOSITION_FALLBACK');
            });

            const { findByTestId } = render(<MarketPropositionWrapper />, {});
            await waitFor(
                async () =>
                    expect(await findByTestId('MARKET_PROPOSITION_FALLBACK')).toBeInTheDocument(),
                {
                    timeout: 5000,
                },
            );
        });
    });
});
