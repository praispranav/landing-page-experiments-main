// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { queryByAttribute } from '@testing-library/react';

import { HeroHeadline } from './HeroHeadline';

const render = renderWithVariantConfig();

describe('Hero Headline', () => {
    const expectedHeroTitle = 'YOUR SPORTS LIVE AND ON DEMAND';

    it(`should have the text key "${expectedHeroTitle}"`, async () => {
        const { container } = render(<HeroHeadline />);

        expect(queryByAttribute("id", container, "HERO_TITLE")).toHaveTextContent(expectedHeroTitle);
    });
});
