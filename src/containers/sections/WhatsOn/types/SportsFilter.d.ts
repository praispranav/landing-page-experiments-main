declare module '@dazn/discovery-web-module-components/dist/SportsFilter' {
    import { FC } from 'react';

    export interface ISportItem {
        id: string;
        title: string;
    }

    interface ISportsFilterProps {
        sportsMenu: ISportItem[];
        isSelected: (sportItem: ISportItem) => boolean;
        resetSelectedSports: () => void;
        toggleSelectedSport: (sportItem: ISportItem) => void;
        sportsSelected: number;
    }

    const SportsFilter: FC<ISportsFilterProps>;
    export default SportsFilter;
}
