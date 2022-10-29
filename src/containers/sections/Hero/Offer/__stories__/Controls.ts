// eslint-disable-next-line jest/no-mocks-import
import { currencyMap } from '@utils/dazn/__mocks__/constants';

export const locale = {
    control: {
        type: 'select',
        options: Object.keys(currencyMap),
    },
};
