import { ISportItem } from '@dazn/discovery-web-module-components/dist/SportsFilter';
import { useRail } from '@hooks/dazn/rail/UseRail';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import addDays from 'date-fns/add_days';
import eachDay from 'date-fns/each_day';
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import { Dispatch, useCallback, useReducer, useState } from 'react';

import { CURRENT_DAY, EPG_DAYS_AFTER, EPG_DAYS_BEFORE } from './constants';

// #region Date Scroller
export const formatDate = (date: Date): string => format(date, 'YYYY-MM-DD');

type DatesRecord = Record<string, boolean>;
export const useEpgDates = (): DatesRecord => {
    const startDate = subDays(CURRENT_DAY, EPG_DAYS_BEFORE);
    const endDate = addDays(CURRENT_DAY, EPG_DAYS_AFTER);

    const rangeDays = eachDay(startDate, endDate);

    return rangeDays.map(formatDate).reduce((acc: DatesRecord, current: string) => {
        acc[current] = true;
        return acc;
    }, {});
};

export const useEpgSelectedDate = (): [string, (date: Date) => void] => {
    const [selectedDate, setSelectedDate] = useState(formatDate(CURRENT_DAY));
    const selectDate = useCallback(
        (date: Date) => {
            const formatedDate = formatDate(date);

            triggerElementClick({
                section: ElementSection.Body,
                itemId: 'calendar_date',
                resourceString: formatedDate,
            });

            setSelectedDate(formatedDate);
        },
        [setSelectedDate],
    );

    return [selectedDate, selectDate];
};
// #endregion

// #region SportsFilter
export const useSportsRail = (): ISportItem[] => {
    const params = { PageType: 'Home', ContentType: 'None' };

    const { Tiles } = useRail({ id: 'Sport', params });
    return Tiles.map((tile) => ({
        id: tile.Id,
        title: tile.Title,
    }));
};

type SelectedSportsReducerState = Record<string, string | null>;
type SelectedSportsReducerAction =
    | { type: 'TOGGLE_SPORT'; payload: ISportItem }
    | { type: 'CLEAR_SPORTS' };

const selectedSportsReducer = (
    state: SelectedSportsReducerState,
    action: SelectedSportsReducerAction,
): SelectedSportsReducerState => {
    switch (action.type) {
        case 'TOGGLE_SPORT': {
            const { id, title } = action.payload;

            return {
                ...state,
                [id]: state[id] ? null : title,
            };
        }

        case 'CLEAR_SPORTS': {
            return {};
        }
    }
};

export const useEpgSelectedSports = (): [
    SelectedSportsReducerState,
    Dispatch<SelectedSportsReducerAction>,
] => useReducer(selectedSportsReducer, {});
// #endregion
