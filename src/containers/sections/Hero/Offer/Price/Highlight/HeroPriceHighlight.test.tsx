import { render } from '@testing-library/react';
import { lorem } from 'faker';

import { HeroPriceHighlight } from './HeroPriceHighlight';

describe('Hero Price Highlight', () => {
    it('should render the highlight with the sample copy', () => {
        const expectedCopy = lorem.words();

        const { queryByText } = render(<HeroPriceHighlight>{expectedCopy}</HeroPriceHighlight>);
        expect(queryByText(expectedCopy)).toHaveTextContent(expectedCopy);
    });
});
