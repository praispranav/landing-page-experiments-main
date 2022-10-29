import { render } from '@testing-library/react';

import { Footer } from './Footer';

const titleText = 'FOO_TITLE';
const subtitleText = 'BAR_SUBTITLE';

describe('Tile.Footer', () => {
    it('should render Tile Footer title and subtitle', () => {
        const { queryByText } = render(
            <Footer title={titleText} subtitle={subtitleText} />
        );

        expect(queryByText(titleText)).toBeInTheDocument();
        expect(queryByText(subtitleText)).toBeInTheDocument();
    });

    it('should render Tile Footer without subtitle', () => {
        const { queryByText } = render(
            <Footer title={titleText} />
        );

        expect(queryByText(titleText)).toBeInTheDocument();
        expect(queryByText(subtitleText)).not.toBeInTheDocument();
    });
})
