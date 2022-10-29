import { formatDate } from '@utils/Date';
import { getCountry, getLanguage } from '@utils/dazn/Region';
import { getDictionaryString } from '@utils/dazn/ResourcesDictionary';
import { getServicePath } from '@utils/dazn/Service';
import { RailTile } from 'types/dazn/Rail/Rail';

export interface ITileImage {
    imageId: string;
    width: number;
    height: number;
}

export const getTileImage = ({ imageId, width, height }: ITileImage): string => {
    const imgBasePath = getServicePath('img', 2);

    return `${imgBasePath}/?id=${imageId}&quality=85&width=${width}&height=${height}&resizeAction=fill&verticalAlignment=top&format=jpg`;
};

export const getTileMetadata = async ({
    Label,
    Type,
    Start,
    IsLinear,
    Related,
}: RailTile): Promise<string> => {
    const metadataArray = [Label];
    const startDate = Start ? new Date(Start) : null;
    const startDateAsString = startDate
        ? await formatDate(startDate, getLanguage(), getCountry())
        : null;

    if (startDateAsString && !IsLinear) {
        metadataArray.push(startDateAsString);
    }

    if (Type === 'Highlights' && Related.length === 0) {
        const highlight = getDictionaryString('browseui_highlightsonly');
        metadataArray.push(highlight);
    }

    return metadataArray.join(' | ');
};
