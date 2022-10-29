import { render, waitFor } from '@testing-library/react';

import { Markdown, OpenTags, stringifyMarkdown } from './Markdown';

describe('Markdown', () => {
    it('should render text correctly', async () => {
        const resourceString = 'Already a subscriber? [Sign in]( /signin )';

        const { getByTestId } = render(
            <Markdown markdown={resourceString} tag={OpenTags.Paragraph} />,
        );
        await waitFor(() => {
            const mardownElement = getByTestId('MARKDOWN_ELEMENT');

            expect(mardownElement.closest('p')?.textContent).toBe('Already a subscriber? Sign in');
            expect(mardownElement).toBeInTheDocument();
        });
    });

    it('should suport the anchor tag', async () => {
        const url = 'https://www.dazn.com';
        const resourceString = `Already a subscriber? [Sign in]( ${url} )`;

        const { getByText } = render(
            <Markdown markdown={resourceString} tag={OpenTags.Paragraph} />,
        );
        await waitFor(() => {
            const anchor = getByText(/Sign in/);
            expect(anchor.closest('a')).toHaveAttribute('href', url);
        });
    });
});

describe('stringifyMarkdown', () => {
    it('should returns the HTML elements as a string', () => {
        const resourceString =
            '- Bundesliga: All Friday and Sunday matches + all highlights directly after the game\n- UEFA Champions League: 121 games including conference';
        const stringifiedHTML = stringifyMarkdown({ markdown: resourceString, tag: OpenTags.Ul });

        expect(typeof stringifiedHTML).toBe('string');
        expect(stringifiedHTML).toMatchInlineSnapshot(
            `
            "<ul>
            <li>Bundesliga: All Friday and Sunday matches + all highlights directly after the game</li>
            <li>UEFA Champions League: 121 games including conference</li>
            </ul>"
        `,
        );
    });
});
