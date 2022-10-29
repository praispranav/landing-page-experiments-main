import ScheduleGrid, {
    IReminderStatus,
    IScheduleTile,
} from '@dazn/discovery-web-module-components/dist/ScheduleGrid';
import { useEpg } from '@hooks/dazn/epg/UseEpg';
import React, { FC } from 'react';

import { scheduleGridStyle } from './ScheduleTiles.style';

const getTileUrl = (): string => '';

// using an empty function to reduce noise in the console for ScheduleGrid
// eslint-disable-next-line @typescript-eslint/no-empty-function
const handleTileClick = (): void => {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const toggleReminder = (tile: IScheduleTile, reminderStatus: IReminderStatus): void => void 0;

const checkIsUserEntitled = (): boolean => false;

interface ScheduleProps {
    selectedDate: string;
    selectedSportsMap: Record<string, string | null>;
}

interface ScheduleFallbackProps {
    isLoading?: boolean;
}

export const ScheduleTiles: FC<ScheduleProps> = ({ selectedDate, selectedSportsMap }) => {
    const selectedSportsIds = Object.keys(selectedSportsMap).filter((id) => selectedSportsMap[id]);
    const tiles = useEpg(selectedDate, selectedSportsIds);

    return (
        <div css={scheduleGridStyle}>
            <ScheduleGrid
                tiles={tiles}
                getTileUrl={getTileUrl}
                handleTileClick={handleTileClick}
                isLoading={false}
                toggleReminder={toggleReminder}
                checkIsUserEntitled={checkIsUserEntitled}
            />
        </div>
    );
};

export const ScheduleTilesFallback: FC<ScheduleFallbackProps> = ({ isLoading = true }) => (
    <ScheduleGrid
        tiles={[]}
        getTileUrl={getTileUrl}
        handleTileClick={handleTileClick}
        isLoading={isLoading}
        toggleReminder={toggleReminder}
        checkIsUserEntitled={checkIsUserEntitled}
    />
);
