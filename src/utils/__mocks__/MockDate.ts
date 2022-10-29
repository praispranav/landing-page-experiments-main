import en from 'date-fns/locale/en';

import * as DateUtils from '../Date';

export const mockDateFnsLocale = (): void => {
    jest.spyOn(DateUtils, 'getDateFnsLocale').mockReturnValue(Promise.resolve(en));
};
