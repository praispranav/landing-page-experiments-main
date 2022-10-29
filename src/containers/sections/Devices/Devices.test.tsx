// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { fireEvent, queryByAttribute, render } from '@testing-library/react';
import { ElementSection, ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';
import { triggerElementClick } from '@tracking/index';

import { Devices } from './Devices';

jest.mock('@tracking/index');
jest.mock('@tracking/hooks/useImpressionTracking');

const devicesLink = 'https://www.dazn.com/en-US/help/articles/what-are-dazn-supported-devices';

jest.mock(
    '@hooks/utils/UseLocalisedConfig',
    // eslint-disable-next-line @typescript-eslint/no-require-imports, jest/no-mocks-import
    () => ({
        useVariantLink: (): string => devicesLink,
    }),
);

describe('Devices', () => {
    beforeEach(() => {
        (useImpressionTracking as jest.Mock).mockReturnValue({
            setTrackingRef: (): Record<string, string> => ({}),
        });
    });

    it('calls useImpressionTracking with the correct params', () => {
        render(<Devices />);

        expect(useImpressionTracking).toHaveBeenCalledWith(ElementVisibilitySections.Devices);
    });

    it('has an anchor tag with the right href', async () => {
        const { container } = render(<Devices />);
        const cta = queryByAttribute('id', container, 'DEVICES_CTA') as HTMLElement;
        cta.click();

        expect(global.location.assign).toHaveBeenCalledWith(devicesLink);
    });

    it('call triggerElementClick event upon click', async () => {
        const mockButtonLabel = 'landingpages_web_devices_button';
        const renderWithConfig = renderWithVariantConfig();

        const { container } = renderWithConfig(<Devices />);

        const cta = queryByAttribute('id', container, 'DEVICES_CTA') as HTMLElement;
        cta.click();
        fireEvent(cta, new MouseEvent('click'));

        expect(triggerElementClick).toHaveBeenCalledWith({
            section: ElementSection.Body,
            itemId: mockButtonLabel,
            resourceString: cta.textContent,
        });
    });
});
