import { DaznError } from './DaznError';

describe('DaznError', () => {
    test('should format error with the Dazn format', () => {
        const error = new DaznError({
            category: 50,
            code: 10049,
            httpStatus: 404,
            message: 'something went wrong',
            name: 'error',
        });

        expect(error.code).toBe('049');
        expect(error.httpStatus).toBe(404);
        expect(error.category).toBe('50');
        expect(error.errorCode).toBe('50-049-404');
        expect(error.message).toBe('something went wrong');
    });
});
