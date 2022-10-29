// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { queryByAttribute } from '@testing-library/react';

import { HeroPPVTag } from './HeroPPVTag';

const render = renderWithVariantConfig();

describe('HeroPPVTag', () => {
    it('renders the Hero ppv tag with the text "Pay per view"', () => {
        const { container } = render(<HeroPPVTag />);

        expect(queryByAttribute('id', container, 'HERO_PPV_TAG')).toHaveTextContent('Pay per View');
    });
});
