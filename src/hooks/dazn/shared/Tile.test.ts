/* eslint-disable jest/no-mocks-import */
import { mockServiceDictionary } from '@utils/dazn/__mocks__/MockService';
import { getDictionaryString } from '@utils/dazn/ResourcesDictionary';
import { RailTile } from 'types/dazn/Rail/Rail';

import { getTileImage, getTileMetadata } from './Tile';

jest.mock('@utils/dazn/Service', () => ({
    getServicePath: (): string => mockServiceDictionary.img.Versions.v2.ServicePath,
}));
jest.mock('@utils/dazn/ResourcesDictionary');

describe('Tile', () => {
    describe('getTileImage', () => {
        test('should return tile image path', () => {
            expect(getTileImage({ imageId: 'imageId', width: 200, height: 100 })).toBe(
                'https://image.discovery.indazn.com/eu/v2/eu/image/?id=imageId&quality=85&width=200&height=100&resizeAction=fill&verticalAlignment=top&format=jpg',
            );
        });
    });

    describe('getTileMetadata', () => {
        beforeEach(() => {
            (getDictionaryString as jest.Mock).mockReturnValue('browseui_highlightsonly');
        });

        test.each`
            Label      | Type            | Start           | Related    | IsLinear     | expected
            ${'label'} | ${'Highlights'} | ${''}           | ${[]}      | ${undefined} | ${'label | browseui_highlightsonly'}
            ${'label'} | ${'Highlights'} | ${''}           | ${['foo']} | ${undefined} | ${'label'}
            ${'label'} | ${'Live'}       | ${''}           | ${[]}      | ${undefined} | ${'label'}
            ${'label'} | ${'Live'}       | ${'02/02/2020'} | ${[]}      | ${false}     | ${'label | February 02'}
            ${'label'} | ${'Live'}       | ${'02/02/2020'} | ${[]}      | ${true}      | ${'label'}
        `(
            'should return "$expected" as metadata when Start is "$Start" and Type is "$Type"',
            async ({ Label, Type, Start, Related, IsLinear, expected }) => {
                const tileInput: Partial<RailTile> = { Label, Type, Start, Related, IsLinear };
                const result = await getTileMetadata(tileInput as RailTile);

                expect(result).toBe(expected);
            },
        );
    });
});
