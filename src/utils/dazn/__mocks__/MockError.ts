import * as Error from '../Error';

export const spyTrackException = (): jest.SpyInstance<ReturnType<typeof Error.trackException>> =>
    jest.spyOn(Error, 'trackException').mockImplementation(() => jest.fn());
