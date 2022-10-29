/* eslint-disable no-console */
import DateScroller from '@dazn/discovery-web-module-components/dist/DateScroller';
import SportsFilter, { ISportItem } from '@dazn/discovery-web-module-components/dist/SportsFilter';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import React, { FC, Suspense, useCallback } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { ALL_SPORTS_FILTER } from './constants';
import { useEpgDates, useEpgSelectedDate, useEpgSelectedSports, useSportsRail } from './Epg.hooks';
import { epgContainerStyle, epgHeaderContainerStyle, getEpgHeaderStyle, ThemeColour } from './Epg.styles';
import { ScheduleTiles, ScheduleTilesFallback } from './ScheduleTiles';

interface ThemeProps {
    theme: ThemeColour;
}

export const Epg: FC<ThemeProps> = ({ theme }) => {
    const scrollDates = useEpgDates();
    const sports = useSportsRail();

    const [selectedDate, selectDate] = useEpgSelectedDate();
    const [selectedSportsMap, dispatchSport] = useEpgSelectedSports();

    const toggleSelectedSport = useCallback(
        (sportItem: ISportItem) => {
            triggerElementClick({
                section: ElementSection.Body,
                itemId: 'sport_filter',
                resourceString: sportItem.title,
            });

            dispatchSport({
                type: 'TOGGLE_SPORT',
                payload: sportItem,
            });
        },
        [dispatchSport],
    );

    const resetSelectedSports = useCallback(
        () => dispatchSport({ type: 'CLEAR_SPORTS' }),
        [dispatchSport],
    );
    const selectedSportsTitles = Object.values(selectedSportsMap).filter(Boolean);

    const isSelected = useCallback(
        (sportItem: ISportItem) => {
            if (sportItem.id === ALL_SPORTS_FILTER) {
                return selectedSportsTitles.length === 0;
            }
            return Boolean(selectedSportsMap[sportItem.id]);
        },
        [selectedSportsMap, selectedSportsTitles.length],
    );

    const epgHeaderStyle = getEpgHeaderStyle(theme)
    return (
        <div css={epgContainerStyle} data-testid="SCHEDULE">
            <div css={epgHeaderContainerStyle}>
                <SportsFilter
                    sportsMenu={sports}
                    isSelected={isSelected}
                    resetSelectedSports={resetSelectedSports}
                    toggleSelectedSport={toggleSelectedSport}
                    sportsSelected={selectedSportsTitles.length}
                />

                <div css={epgHeaderStyle}>
                    <DateScroller
                        dates={scrollDates}
                        selectedDate={selectedDate}
                        setSelectedDate={selectDate}
                    />
                </div>
            </div>
            <ErrorBoundary fallback={<ScheduleTilesFallback isLoading={false} />}>
                <Suspense fallback={<ScheduleTilesFallback />}>
                    <ScheduleTiles
                        selectedDate={selectedDate}
                        selectedSportsMap={selectedSportsMap}
                    />
                </Suspense>
            </ErrorBoundary>
        </div>
    );
};
