// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
// eslint-disable-next-line jest/no-mocks-import
import { spyUseLabelResultFound, spyUseLabelResultNotFound } from '@labels/__mocks__/MockUseLabel';
import { queryByAttribute } from '@testing-library/react';

import { HeroLead } from './HeroLead';

jest.mock('@labels/labels', () => ({
    ...jest.requireActual('@labels/labels'),
    useLabelKey: jest.fn(),
}));

const render = renderWithVariantConfig();

describe('Hero Lead', () => {
    it('renders the hero title with description', async () => {
        const mockedUseLabel = spyUseLabelResultFound();
        const { container } = render(<HeroLead />);

        expect(queryByAttribute("id", container, 'HERO_DESCRIPTION')).toHaveTextContent('Watch thousands of sports events in HD quality on all devices.');
        expect(mockedUseLabel).toHaveBeenCalledTimes(1)
        expect(mockedUseLabel).toHaveBeenCalledWith({ stringKey: 'landingpages_web_hero_description' })
    });

    it('does not render the description if it is not available', async () => {
        const mockedUseLabel = spyUseLabelResultNotFound();

        const { container } = render(<HeroLead />);

        expect(queryByAttribute("id", container, 'HERO_DESCRIPTION')).toBeNull();
        expect(mockedUseLabel).toHaveBeenCalledTimes(1)
        expect(mockedUseLabel).toHaveBeenCalledWith({ stringKey: 'landingpages_web_hero_description' })
    });
});
