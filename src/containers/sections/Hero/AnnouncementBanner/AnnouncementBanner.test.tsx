// eslint-disable-next-line jest/no-mocks-import
import { ElementSettingKeys } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
// eslint-disable-next-line jest/no-mocks-import
import { MockVariantConfig } from '@experiments/__mocks__/MockVariantConfig';

import { AnnouncementBanner } from './AnnouncementBanner';

const render = renderWithVariantConfig({
    ...MockVariantConfig,
    elements: { [ElementSettingKeys.AnnouncementBanner]: true },
});

describe('Hero Announcement Component', () => {
    it('renders the element with expected copy', async () => {
        const { findByText } = render(<AnnouncementBanner />);
        const tag = await findByText('ALSO IN FULL HD');
        expect(tag).toBeInTheDocument();
    });
});
