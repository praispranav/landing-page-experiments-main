declare module '@dazn/discovery-web-module-components/dist/DateScroller' {
    import { FC } from 'react';

    interface IDateScrollerProps {
        dates?: Record<string, boolean>;
        setSelectedDate: (date: Date) => void;
        selectedDate: string;
    }

    const DateScroller: FC<IDateScrollerProps>;
    export default DateScroller;
}
