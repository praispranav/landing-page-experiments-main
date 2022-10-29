import { fireEvent, render } from '@testing-library/react';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
// eslint-disable-next-line jest/no-mocks-import
import { spySetCurrentChapter } from '@utils/dazn/__mocks__/MockChapterHistory';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';
import { Periodicity } from 'types/dazn/RatePlans/Offers';

import { HeroSignupCTA } from './HeroSignupCTA';

jest.mock('@tracking/index');

describe('HeroCTA', () => {
    it('should set the chapterPath as account/signup and call GA button tracking upon clicking', async () => {
        const itemId = 'landingpages_web_hero_button_freeTrial';
        const resourceString = 'Sign up';

        const { findByTestId } = render(
            <HeroSignupCTA
                period={Periodicity.Annual}
                clickEventPayload={{ itemId, resourceString }}
            />,
        );

        const spiedSetChapter = spySetCurrentChapter();

        const cta = await findByTestId('HERO_CTA');
        cta.click();
        fireEvent(cta, new MouseEvent('click'));

        expect(spiedSetChapter).toHaveBeenCalledWith({
            chapterName: DaznChapterEnum.Auth,
            chapterPath: 'account/signup/annual',
        });

        expect(triggerElementClick).toHaveBeenCalledWith({
            section: ElementSection.Body,
            itemId,
            resourceString,
        });
    });
});
