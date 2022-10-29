// eslint-disable-next-line jest/no-mocks-import
import { mockComingUpRails } from '@hooks/dazn/rail/__mocks__/MocksUseRail';
import { useRail } from '@hooks/dazn/rail/UseRail';
import { act, renderHook } from '@testing-library/react-hooks';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import addDays from 'date-fns/add_days';
import eachDay from 'date-fns/each_day';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';

import { useEpgDates, useEpgSelectedDate, useEpgSelectedSports, useSportsRail } from './Epg.hooks';

jest.mock('@hooks/dazn/rail/UseRail');
jest.mock('@tracking/index');

describe('Epg.hooks', () => {
    describe('useEpgDates', () => {
        test('should return a dictionary of dates ranging from -30 days to +14 days', () => {
            const { result } = renderHook(() => useEpgDates());
            const dates = Object.keys(result.current);

            const currentDay = Date.now();
            const startDate = subDays(currentDay, 30);
            const endDate = addDays(currentDay, 14);

            const expectedDates = eachDay(startDate, endDate).map((date) =>
                format(date, 'YYYY-MM-DD'),
            );

            expect(expectedDates).toStrictEqual(dates);
        });
    });

    describe('useEpgSelectedDate', () => {
        test('should set selected date and call triggerElementClick', () => {
            const expectedDate = '2021-03-18';
            const { result } = renderHook(() => useEpgSelectedDate());

            act(() => {
                const [, selectDate] = result.current;
                selectDate(new Date('2021-03-18T11:04:46.868Z'));
            });

            const [selectedDate] = result.current;

            expect(selectedDate).toBe(expectedDate);
            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Body,
                itemId: 'calendar_date',
                resourceString: expectedDate,
            });
        });
    });

    describe('useSportsRail', () => {
        test('should call rail hook and return sport tiles', async () => {
            const mockComingUpRail = await mockComingUpRails.getEnglish();
            (useRail as jest.Mock).mockReturnValue(mockComingUpRail);

            const { result } = renderHook(() => useSportsRail());

            expect(useRail).toHaveBeenCalledWith({
                id: 'Sport',
                params: { ContentType: 'None', PageType: 'Home' },
            });

            expect(result.current).toHaveLength(12);
        });
    });

    describe('useEpgSelectedSports', () => {
        test('should set CLEAR_SPORTS state', () => {
            const { result } = renderHook(() => useEpgSelectedSports());

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: 'CLEAR_SPORTS' });
            });

            const [state] = result.current;
            expect(state).toEqual({});
        });

        test('should set TOGGLE_SPORT state', () => {
            const { result } = renderHook(() => useEpgSelectedSports());

            act(() => {
                const [, dispatch] = result.current;
                dispatch({ type: 'TOGGLE_SPORT', payload: { id: 'sport', title: 'boxing' } });
            });
            const [state] = result.current;

            expect(state).toEqual({ sport: 'boxing' });
        });
    });
});
