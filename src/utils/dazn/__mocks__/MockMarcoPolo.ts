import { random } from 'faker';

import * as MarcoPolo from '../MarcoPolo';

export const mockDeviceId = (id: string = random.uuid()): jest.SpyInstance =>
    jest.spyOn(MarcoPolo, 'getDeviceId').mockReturnValue(id);

const mockDevMode = (): jest.SpyInstance => jest.spyOn(MarcoPolo, 'isDevModeEnabled');

export const mockEnableDevMode = (): jest.SpyInstance => mockDevMode().mockReturnValue(true);

export const mockDisableDevMode = (): jest.SpyInstance => mockDevMode().mockReturnValue(false);
