/* eslint-disable jest/no-mocks-import */
import { ThemeEnum } from '@components/Style/Theme';
import { configure, Matcher, render } from '@testing-library/react';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import { mockServicePath } from '@utils/dazn/__mocks__/MockService';
import { internet } from 'faker';

import Epg from '.';
import { useEpgDates, useEpgSelectedDate, useEpgSelectedSports, useSportsRail } from './Epg.hooks';

const mockedSports = [
    {
        id: 'Sport:2x2oqzx60orpoeugkd754ga17',
        title: 'Boxing',
    },
    {
        id: 'Competition:8rfcag7xa3b7k4hluhrq3geve',
        title: 'Boxing Archive',
    },
];

jest.mock('@hooks/dazn/epg/UseEpg').mock('./Epg.hooks');
jest.mock('@tracking/index');

const renderSportsFilter = (): {
    getAllByTestId: (id: Matcher) => HTMLElement[];
    getByText: (id: Matcher) => HTMLElement;
} => {
    const { getByTestId, getAllByTestId, getByText } = render(<Epg theme={ThemeEnum.Dark} />);
    const filterButton = getByTestId('SPORTFILTER_BUTTON');
    filterButton.click();

    return { getAllByTestId, getByText };
};

describe('Epg', () => {
    beforeEach(() => {
        (useEpgSelectedDate as jest.Mock).mockReturnValue(['2020-02-10', jest.fn()]);
        (useEpgSelectedSports as jest.Mock).mockReturnValue([{}, jest.fn()]);
        (useEpgDates as jest.Mock).mockReturnValue({
            '2020-01-10': true,
            '2020-02-10': true,
            '2020-03-10': true,
        });

        mockServicePath(internet.url());
        (useSportsRail as jest.Mock).mockReturnValueOnce(mockedSports);
        configure({ testIdAttribute: 'data-test-id' });
    });

    test('should render Epg with available sports items in filter', () => {
        const { getAllByTestId } = renderSportsFilter();

        const availableSports = getAllByTestId('SPORTFILTER_LIST_ITEM');
        expect(availableSports).toHaveLength(mockedSports.length);
    });

    test('should call triggerElementClick upon clicking on sports items in the filter', () => {
        const boxingTitle = 'Boxing';

        const { getByText } = renderSportsFilter();
        const boxingItemFilter = getByText(boxingTitle);
        boxingItemFilter.click();

        expect(triggerElementClick).toHaveBeenCalledWith({
            section: ElementSection.Body,
            itemId: 'sport_filter',
            resourceString: boxingTitle,
        });
    });
});
