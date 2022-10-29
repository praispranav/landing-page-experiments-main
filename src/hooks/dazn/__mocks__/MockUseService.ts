import * as useService from '@hooks/dazn/UseService';
import * as reactQuery from 'react-query';

export const mockUseQuery = (value: reactQuery.QueryObserverResult): jest.SpyInstance =>
    jest.spyOn(reactQuery, 'useQuery').mockReturnValue(value);

export const spyUseService = (
    queryMockData: Partial<reactQuery.QueryObserverResult> = {},
): jest.SpyInstance => {
    mockUseQuery(queryMockData as reactQuery.QueryObserverResult);

    return jest.spyOn(useService, 'useService');
};
