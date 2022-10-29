import { ElementSettingKeys } from '@config/ConfigsKeys';
// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { waitFor } from '@testing-library/react';
import { ReactElement } from 'react';

import { WhatsOn } from './WhatsOn';

jest.mock(
    './Epg',
    () =>
        function Epg(): ReactElement {
            return <div data-testid="SCHEDULE" />;
        },
);
jest.mock(
    './ComingUp',
    () =>
        function ComingUp(): ReactElement {
            return <div data-testid="COMINGUPGRID" />;
        },
);

jest.mock(
    './NextUp',
    () =>
        function NextUp(): ReactElement {
            return <div data-testid="NEXTUPGRID" />;
        },
);

jest.mock('@hooks/utils/UseLocalisedConfig');

import { useElementSetting } from '@hooks/utils/UseLocalisedConfig';

import { WhatsOnVariantEnum } from './Variants';

const { useElementSetting: actualElementSetting } = jest.requireActual(
    '@hooks/utils/UseLocalisedConfig',
);

const mockWhatsOnVariant =
    (whatsOnVariant?: WhatsOnVariantEnum, railId?: string) =>
    (elementName: ElementSettingKeys): unknown => {
        if (elementName === ElementSettingKeys.WhatsOnVariant) {
            return whatsOnVariant;
        }
        if (elementName === ElementSettingKeys.RailId) {
            return railId;
        }
        return actualElementSetting(elementName);
    }

const render = renderWithVariantConfig();

describe('WhatsOn', () => {
    describe('WhatsOn renders section with lazy Epg and title', () => {
        test('if whatsOnVariant is undefined', async () => {
            (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(undefined));
            const { getByTestId, getByRole } = render(<WhatsOn />);

            await waitFor(() => {
                expect(getByTestId('SCHEDULE')).toBeInTheDocument();
                expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
            });
        });

        test('if whatsOnVariant is Epg', async () => {
            (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(WhatsOnVariantEnum.Epg));
            const { getByTestId, getByRole } = render(<WhatsOn />);

            await waitFor(() => {
                expect(getByTestId('SCHEDULE')).toBeInTheDocument();
                expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
            });
        });
    })

    test('WhatsOn renders section with lazy ComingUp and title if whatsOnVariant is ComingUp', async () => {
        (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(WhatsOnVariantEnum.ComingUp));
        const { getByTestId, getByRole } = render(<WhatsOn />);

        await waitFor(() => {
            expect(getByTestId('COMINGUPGRID')).toBeInTheDocument();
            expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
        });
    });

    test('WhatsOn renders section with lazy ComingUp and title if whatsOnVariant is NextUp but no railId is set', async() => {
        (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(WhatsOnVariantEnum.NextUp));
        const { getByTestId, getByRole } = render(<WhatsOn />);

        await waitFor(() => {
            expect(getByTestId('COMINGUPGRID')).toBeInTheDocument();
            expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
        });
    });

    test('WhatsOn renders section with lazy ComingUp and title if whatsOnVariant is NextUp but railId empty string', async() => {
        (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(WhatsOnVariantEnum.NextUp, ''));
        const { getByTestId, getByRole } = render(<WhatsOn />);

        await waitFor(() => {
            expect(getByTestId('COMINGUPGRID')).toBeInTheDocument();
            expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
        });
    });

    test('WhatsOn renders section with lazy NextUp and title if whatsOnVariant is NextUp and railId is set', async() => {
        (useElementSetting as jest.Mock).mockImplementation(mockWhatsOnVariant(WhatsOnVariantEnum.NextUp, 'mockedRailId'));
        const { getByTestId, getByRole } = render(<WhatsOn />);

        await waitFor(() => {
            expect(getByTestId('NEXTUPGRID')).toBeInTheDocument();
            expect(getByRole('heading', { level: 2 }).textContent).toBe("What's On DAZN");
        });
    });
});
