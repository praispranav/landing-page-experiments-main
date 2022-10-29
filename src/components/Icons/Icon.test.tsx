import { render, waitFor } from '@testing-library/react';

import { Icon } from './Icon';

describe('Icon', () => {
    it('should render an icon with the name as alt and the source as the transformed file content', async () => {
        const vectorName = 'external_link';

        const { findByRole, getByRole } = render(<Icon name={vectorName} />);

        await waitFor(async () => {
            await findByRole('img');
        });

        const img = getByRole('img');

        expect(img).toHaveAttribute('alt', vectorName);
        expect(img).toHaveAttribute('src', `${vectorName}.svg`);
    });
});
