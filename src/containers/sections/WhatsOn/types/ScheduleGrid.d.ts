declare module '@dazn/discovery-web-module-components/dist/ScheduleGrid' {
    import { FC } from 'react';

    export interface IScheduleTile {
        id?: string;
        eventId: string;
        title?: string;
        subtitle: string;
        imageUrl: string;
        labels?: string[];
    }

    interface IReminder {
        id?: string;
        title: string;
        imageId: string | null;
    }

    interface IFavourite {
        id?: string;
        name: string;
        imageId: string | null;
        type: string;
        events?: string[];
        push?: boolean;
        rail?: boolean;
    }

    export interface IReminderStatus {
        isReminderActive: boolean;
        isReminderDisabled: boolean;
    }

    interface IScheduleGridProps {
        tiles: IScheduleTile[];
        isLoading: boolean;
        handleTileClick: (tile: IScheduleTile) => void;
        getTileUrl: (tile: IScheduleTile) => string;
        favourites?: IFavourite[];
        reminders?: IReminder[];
        toggleReminder: (tile: IScheduleTile, reminderStatus: IReminderStatus) => void;
        checkIsUserEntitled: () => boolean;
    }

    const ScheduleGrid: FC<IScheduleGridProps>;
    export default ScheduleGrid;
}
