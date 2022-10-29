import { queryClient, QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { mockComingUpRails } from '@hooks/dazn/rail/__mocks__/MocksUseRail';
import { renderHook, RenderHookResult } from '@testing-library/react-hooks';
import { RailResponse } from 'types/dazn/Rail/Rail';

// eslint-disable-next-line jest/no-mocks-import
import { getComingUpFightTilesMock } from './__mocks__/ComingUpMocks';
import { useBoxingComingUpTiles } from './ComingUp.hooks';

jest.mock('@hooks/dazn/rail/UseRail');
import { useRail } from '@hooks/dazn/rail/UseRail';

jest.mock('@utils/dazn/Region');
import { getLanguage } from '@utils/dazn/Region';

const renderFightTiles = (): RenderHookResult<
    Record<string, never>,
    ReturnType<typeof useBoxingComingUpTiles>
> => renderHook(() => useBoxingComingUpTiles(), { wrapper: QueryClientWrapper });

const getMockMixedComingUp = async (): Promise<RailResponse> => {
    const comingUpEnglish = await mockComingUpRails.getEnglish();
    const comingUpSpanish = await mockComingUpRails.getSpanish();

    return { ...comingUpEnglish, Tiles: [...comingUpEnglish.Tiles, ...comingUpSpanish.Tiles] };
};

describe('useComingUpTiles', () => {
    beforeEach(() => queryClient.clear());

    test('should call the rail with ComingUp as being the ID', async () => {
        const mockComingUpRail = await mockComingUpRails.getEnglish();
        (useRail as jest.Mock).mockReturnValue(mockComingUpRail);

        const { result, waitFor } = renderFightTiles();
        await waitFor(() => result.current.length > 0);

        expect(useRail as jest.Mock).toHaveBeenCalledWith({
            id: 'ComingUp',
            params: {
                ContentId: expect.anything(),
                ContentType: 'Sport',
                PageType: 'Sport',
            },
        });
    });

    test('should map the rail tiles into the format consumed by the fight tiles', async () => {
        const mockComingUpRail = await mockComingUpRails.getEnglish();
        (useRail as jest.Mock).mockReturnValue(mockComingUpRail);

        const { result, waitFor } = renderFightTiles();
        await waitFor(() => result.current.length > 0);

        const expectedFightTiles = await getComingUpFightTilesMock();
        expect(result.current).toStrictEqual(expectedFightTiles);
    });

    test.each`
        language | titleSuffix
        ${'en'}  | ${'Fight Night'}
        ${'es'}  | ${'Noche de Pelea'}
    `(
        `should filter the rail for $language tiles that contain "$titleSuffix" in the tile`,
        async ({ titleSuffix, language }) => {
            const mockComingUpRail = await getMockMixedComingUp();

            (getLanguage as jest.Mock).mockReturnValue(language);
            (useRail as jest.Mock).mockReturnValue(mockComingUpRail);

            const { result, waitFor } = renderFightTiles();
            await waitFor(() => result.current.length > 0);

            expect(result.current.every(({ title }) => title.includes(titleSuffix))).toBeTruthy();
            expect(result.current.length).toBeGreaterThan(1);
        },
    );
});
