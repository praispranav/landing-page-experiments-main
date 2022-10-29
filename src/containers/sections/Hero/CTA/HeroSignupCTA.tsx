import { Button } from '@components/Button/Button';
import { buttonsSizeStyle } from '@components/Button/Button.style';
import { mqStylesCombiner } from '@components/Style/MqStylesCombiner';
import { ButtonsThemeEnum } from '@components/Style/Theme';
import { ElementSection, IElementClick } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { FC, MouseEvent } from 'react';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';
import { Periodicity, PeriodicityKeys } from 'types/dazn/RatePlans/Offers';

type Period = PeriodicityKeys | null;
type ClickEventPayload = Omit<IElementClick, 'section'>;

const mapPeriodicityToUrl: Record<Periodicity, string> = {
    [Periodicity.Annual]: 'account/signup/annual',
    [Periodicity.Month]: 'account/signup/month',
    [Periodicity.Instalments]: 'account/signup/instalments',
    [Periodicity.Default]: 'account/signup',
};

const onClickSignUp =
    (period: Period, clickEventPayload: ClickEventPayload) =>
    (event: MouseEvent<HTMLButtonElement | HTMLAnchorElement>): void => {
        event.preventDefault();

        triggerElementClick({ section: ElementSection.Body, ...clickEventPayload });

        setCurrentChapter({
            chapterName: DaznChapterEnum.Auth,
            chapterPath: period ? mapPeriodicityToUrl[period] : mapPeriodicityToUrl.Default,
        });
    };

interface HeroSignupCTAProps {
    period: Period;
    clickEventPayload: ClickEventPayload;
}

export const HeroSignupCTA: FC<HeroSignupCTAProps> = ({
    period,
    clickEventPayload,
    children,
    ...props
}) => (
    <Button
        {...props}
        theme={ButtonsThemeEnum.PrimaryDarkBg}
        size={mqStylesCombiner([buttonsSizeStyle.Large, buttonsSizeStyle.Small])}
        onClick={onClickSignUp(period, clickEventPayload)}
        data-testid="HERO_CTA"
        cta
    >
        {children}
    </Button>
);
