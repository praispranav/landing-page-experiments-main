// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { queryByAttribute } from '@testing-library/react';

import { HeroLegal } from './HeroLegal';

const render = renderWithVariantConfig();
jest.mock('@labels/labels');

describe('Hero Legal', () => {
    it('renders the hero with legal disclaimer', () => {
        const { container } = render(<HeroLegal />);

        expect(queryByAttribute('id', container, 'HERO_LEGAL_COPY')).toHaveTextContent(
            'Minimum duration (of contract) is 1 year.',
        );
    });
});
