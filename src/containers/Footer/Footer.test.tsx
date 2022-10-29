// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { FooterItem } from '@hooks/resourceStrings/Types';
import { ElementVisibilitySections } from '@tracking/events.types';
import { useImpressionTracking } from '@tracking/hooks/useImpressionTracking';

import { Footer } from './Footer';
import { useLanguageSwitcherData } from './LanguageSwitcher.hooks';

const footerListMock: FooterItem[] = [
    {
        key: 'footer_help',
        label: 'HELP',
        href: 'https://www.dazn.com/help',
    },
    {
        key: 'footer_faq',
        label: 'FAQ',
        href: 'https://www.dazn.com/faq',
    },
];

const render = renderWithVariantConfig();

jest.mock('./LanguageSwitcher.hooks');
jest.mock(
    '@hooks/utils/UseLocalisedConfig',
    // eslint-disable-next-line @typescript-eslint/no-require-imports, jest/no-mocks-import
    () => ({
        useLocalisedLists: (): FooterItem[] => footerListMock,
        useVariantLink: (key: string): string => key,
        useLocalisedStringKey: (key: string): string => key,
        useResourceStringKey: (key: string): string => key,
    }),
);
jest.mock('@tracking/hooks/useImpressionTracking');

describe('Footer', () => {
    beforeEach(() => {
        (useLanguageSwitcherData as jest.Mock).mockReturnValue({
            languageSwitcherLabel: 'ENGLISH',
            languageSwitcherkey: 'footer_language_switcher',
        });

        (useImpressionTracking as jest.Mock).mockReturnValue({
            setTrackingRef: (): Record<string, string> => ({}),
        });
    });

    it('renders a list', async () => {
        const { findByRole } = render(<Footer />);
        const list = await findByRole('list');

        expect(list).toBeTruthy();
    });

    it('renders the correct amount of items when it should display the Language Switcher', async () => {
        const additionalElements = ['language switcher', 'Dazn trademark'];
        const expectedFooterLength = footerListMock.length + additionalElements.length;

        const { findAllByRole, getAllByRole } = render(<Footer />);

        await findAllByRole('listitem');
        const listItems = getAllByRole('listitem');

        expect(listItems.length).toBe(expectedFooterLength);
    });

    it('renders the correct amount of items when it the language switcher is hidden', async () => {
        const additionalElements = ['Dazn trademark'];
        const expectedFooterLength = footerListMock.length + additionalElements.length;

        (useLanguageSwitcherData as jest.Mock).mockReturnValue({
            languageSwitcherLabel: '',
            languageSwitcherkey: 'footer_language_switcher',
        });
        const { findAllByRole, getAllByRole } = render(<Footer />);

        await findAllByRole('listitem');
        const listItems = getAllByRole('listitem');

        expect(listItems.length).toBe(expectedFooterLength);
    });

    it('calls useImpressionTracking with the correct params', () => {
        render(<Footer />);

        expect(useImpressionTracking).toHaveBeenCalledWith(ElementVisibilitySections.Footer);
    });
});
