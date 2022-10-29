import { QueryClientWrapper } from '@config/QueryClient';
// eslint-disable-next-line jest/no-mocks-import
import { renderHook } from '@testing-library/react-hooks';
import * as daznService from '@utils/dazn/Service';
import { random } from 'faker';

import { getTileImage } from '../shared/Tile';
// eslint-disable-next-line jest/no-mocks-import
import { mockComingUpRails, mockServiceDictionary } from './__mocks__/MocksUseRail';
import { IRailHookRailParams } from './types';
import { useRail } from './UseRail';

jest.mock('../UseService');

import { useService } from '../UseService';

const RAIL_CONFIG_MOCK = {
    name: 'Rail',
    version: 3,
    category: 78,
};

describe('UseRail', () => {
    describe('Hook', () => {
        const hookOptions = { wrapper: QueryClientWrapper };
        const paramsString = 'ContentId:123;ContentType:456;PageType:789;';

        test('should transform and embed the params object into the request', async () => {
            const mockComingUpRail = await mockComingUpRails.getEnglish();
            (useService as jest.Mock).mockReturnValue({ data: mockComingUpRail });

            const params: IRailHookRailParams = {
                ContentId: '123',
                ContentType: '456',
                PageType: '789',
            };

            const id = random.uuid();
            renderHook(() => useRail({ id, params }), hookOptions);

            expect(useService as jest.Mock).toHaveBeenCalledWith(RAIL_CONFIG_MOCK, {
                key: id,
                query: expect.objectContaining({
                    params: paramsString,
                }),
                onError: expect.any(Function),
            });
        });
        test('should return the tiles when using params in string format', async () => {
            const mockComingUpRail = await mockComingUpRails.getEnglish();
            (useService as jest.Mock).mockReturnValue({ data: mockComingUpRail });
            const id = random.uuid();

            const { result } = renderHook(() => useRail({ id, params: paramsString }), hookOptions);

            expect(result.current).toStrictEqual(
                expect.objectContaining({
                    Title: mockComingUpRail.Title,
                    Tiles: mockComingUpRail.Tiles,
                }),
            );

            expect(useService as jest.Mock).toHaveBeenCalledWith(RAIL_CONFIG_MOCK, {
                key: id,
                query: expect.objectContaining({ params: paramsString }),
                onError: expect.any(Function),
            });
        });
    });

    describe('Tile Image', () => {
        const mockImgServicePath = new URL(mockServiceDictionary.img.Versions.v2.ServicePath);
        beforeEach(() => {
            jest.spyOn(daznService, 'getServicePath').mockReturnValue(mockImgServicePath);
        });

        test('should build the tile image, given the width, height and image id passed', () => {
            const imageId = random.uuid();
            const width = random.number();
            const height = random.number();

            const imageUrl = getTileImage({ imageId, width, height });
            const expectedUrl = `${mockImgServicePath}/?id=${imageId}&quality=85&width=${width}&height=${height}&resizeAction=fill&verticalAlignment=top&format=jpg`;

            expect(imageUrl).toBe(expectedUrl);
        });
    });
});
