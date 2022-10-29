import { getLanguage } from '@utils/dazn/Region';
import { RailTile } from 'types/dazn/Rail/Rail';

import { filterBoxingRails, formatToTile } from './utils';

jest.mock('@utils/dazn/Region');

describe("What's On Utils", () => {
    describe('formatToTile', () => {
        beforeEach(() => {
            (getLanguage as jest.Mock).mockReturnValue('en');
        });

        const mockRailTile: RailTile = {
            Id: 'id',
            NavigateTo: null,
            Type: 'UpComing',
            NavParams: null,
            BackgroundImage: null,
            PromoImage: null,
            Description: '',
            End: null,
            Videos: [],
            Related: [],
            TournamentCalendar: {
                Id: 'id',
                Title: 'title',
            },
            Sport: {
                Id: 'id',
                Images: [
                    {
                        Id: 'imageId',
                        ImageType: 'jpg',
                        ImageMimeType: 'image/jpeg',
                    },
                ],
                Title: 'title',
            },

            Title: 'title',
            Image: {
                Id: 'imageId',
                ImageType: 'jpg',
                ImageMimeType: 'image/jpeg',
            },
            EventId: 'eventId',
            EntitlementIds: [],
            Start: '',
            AgeRating: null,
            AssetId: 'assetId',
            AssetTypeId: 'assetTypeId',
            VideoType: 'Vod',
            IsGeoRestricted: false,
            IsLinear: false,
            Status: null,
            IsDownloadable: false,
            VerifyAge: false,
            NewLabel: false,
            IsFreeToView: false,
            PinProtect: false,
            ExpirationDate: null,
            Label: '',
        };

        it('should format a tile with start date', async () => {
            await expect(
                formatToTile({ ...mockRailTile, Start: '2020-01-01T00:00:00Z' }),
            ).resolves.toEqual({
                title: 'title',
                imageId: 'imageId',
                eventId: 'eventId',
                entitlementIds: [],
                subtitle: 'January 01',
            });
        });

        it('should format a tile without a start date', async () => {
            await expect(formatToTile(mockRailTile)).resolves.toEqual({
                title: 'title',
                imageId: 'imageId',
                eventId: 'eventId',
                entitlementIds: [],
                subtitle: '',
            });
        });
    });

    describe('filterBoxingRails', () => {
        const mockTile = {
            title: 'title',
            imageId: 'imageId',
            eventId: 'eventId',
            entitlementIds: [],
            subtitle: '',
        };

        it('should filter boxing tiles - EN', () => {
            (getLanguage as jest.Mock).mockReturnValue('en');

            const mockRails = [
                mockTile,
                { ...mockTile, title: 'Fight Night: GGG vs Canelo' },
                { ...mockTile, title: 'Fight Night: Wood vs Connor Benn' },
            ];

            expect(filterBoxingRails(mockRails)).toHaveLength(2);
        });

        it('should filter boxing tiles - ES', () => {
            (getLanguage as jest.Mock).mockReturnValue('es');

            const mockRails = [
                mockTile,
                { ...mockTile, title: 'Noche de Pelea: GGG vs Canelo' },
                { ...mockTile, title: 'Noche de Pelea: Wood vs Connor Benn' },
            ];

            expect(filterBoxingRails(mockRails)).toHaveLength(2);
        });
    });
});
