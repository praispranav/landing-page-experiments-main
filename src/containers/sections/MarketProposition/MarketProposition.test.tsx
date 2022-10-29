/* eslint-disable jest/no-mocks-import */
import { ElementSettingKeys } from '@config/ConfigsKeys';
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { MockVariantConfig } from '@experiments/__mocks__/MockVariantConfig';
import { fireEvent, waitFor } from '@testing-library/react';
import { ElementSection, ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import { triggerElementClick } from '@tracking/index';

import { MarketProposition } from './';

jest.mock('@tracking/index');
jest.mock('./MarketProposition.hooks');
jest.mock('@tracking/hooks/useImpressionTracking');

import { mockedHighlights } from './__mocks__/MarketPropositionMocks';
import { useHighlights } from './MarketProposition.hooks';

const renderWithConfig = ({
    showMarketProposition,
}: {
    showMarketProposition: boolean;
}): ReturnType<typeof renderWithVariantConfig> =>
    renderWithVariantConfig({
        ...MockVariantConfig,
        elements: {
            [ElementSettingKeys.MarketPropositionSection]: showMarketProposition,
        },
    });

describe('Market Proposition', () => {
    beforeEach(() => {
        (useImpressionTracking as jest.Mock).mockReturnValue({
            setTrackingRef: (): Record<string, string> => ({}),
        });
    });

    describe('UI', () => {
        beforeEach(() => (useHighlights as jest.Mock).mockReturnValue(mockedHighlights));

        it('should hide the block when MARKET_PROPOSITION_SECTION element setting is false', async () => {
            const render = renderWithConfig({ showMarketProposition: false });
            const { queryByRole } = render(<MarketProposition />);

            await waitFor(() => expect(queryByRole('list')).toBeNull());
        });

        it('should render all highlight headings', async () => {
            const render = renderWithConfig({ showMarketProposition: true });
            const { findAllByRole } = render(<MarketProposition />);

            await waitFor(
                async () => {
                    expect(useHighlights as jest.Mock).toHaveBeenCalled();

                    const headings = await findAllByRole('heading', { level: 2 });
                    headings.forEach((heading, index) =>
                        expect(heading).toHaveTextContent(mockedHighlights[index].headline),
                    );
                },
                { timeout: 3000 },
            );
        });

        it('should render all highlights info', async () => {
            const render = renderWithConfig({ showMarketProposition: true });
            const { findAllByRole } = render(<MarketProposition />);

            await waitFor(async () => {
                expect(useHighlights as jest.Mock).toHaveBeenCalled();

                const infos = await findAllByRole('list');
                infos.forEach((info, index) =>
                    expect(info).toContainHTML(mockedHighlights[index].info),
                );
            });
        });
    });

    describe('CTA', () => {
        beforeEach(() => (useHighlights as jest.Mock).mockReturnValue([]));

        it('should send the user to "/account/payment-plan" upon click', async () => {
            const render = renderWithConfig({ showMarketProposition: true });
            const { findByRole } = render(<MarketProposition />);

            const cta = await findByRole('button');
            fireEvent.click(cta);

            expect(global.location.assign).toHaveBeenCalledWith(
                'https://www.dazn.com/account/payment-plan',
            );
        });

        it('should call triggerElementClick upon click on CTA', async () => {
            const buttonLabel = 'landingpages_web_marketproposition_cta';

            const render = renderWithConfig({ showMarketProposition: true });
            const { findByRole } = render(<MarketProposition />);

            const cta = await findByRole('button');
            fireEvent.click(cta);

            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Body,
                itemId: buttonLabel,
                resourceString: cta.textContent,
            });
        });
    });

    describe('GA', () => {
        it('calls useImpressionTracking with the correct params', () => {
            (useHighlights as jest.Mock).mockReturnValue([]);
            const render = renderWithConfig({ showMarketProposition: true });
            render(<MarketProposition />);

            expect(useImpressionTracking).toHaveBeenCalledWith(
                ElementVisibilitySections.MarketProposition,
            );
        });
    });
});
