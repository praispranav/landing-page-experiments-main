import { Button } from '@components/Button/Button';
import { buttonsSizeStyle } from '@components/Button/Button.style';
import { Icon } from '@components/Icons/Icon';
import { ButtonsThemeEnum } from '@components/Style/Theme';
import { ResourceStringsKeys } from '@config/ConfigsKeys';
import { Label } from '@dazn/fe-labels-react';
import { useSignupKey } from '@hooks/resourceStrings/signup/UseSignupKey';
import { ResourceStringLabel } from '@hooks/resourceStrings/Types';
import { useResourceStringKey } from '@hooks/resourceStrings/UseLocalisedStrings';
import { useLabelKey } from '@labels/labels';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { FC, MouseEvent, Suspense, useState } from 'react';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import { useHasScrolledBelowFold } from './Header.hooks';
import { getHeaderSignupStyle, getSignupBannerStyle, headerStyle, logoStyle } from './Header.style';
import { HeaderRef } from './Types';

export const scrollIntoHeader = (headerRef: HeaderRef): void => {
    if (!headerRef) {
        return;
    }

    headerRef.nextElementSibling?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'center',
    });
};

const onClickSignIn =
    (stringLabel: ResourceStringLabel | '', resourceString: string) =>
    (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        triggerElementClick({
            section: ElementSection.Header,
            itemId: stringLabel,
            resourceString,
        });
        setCurrentChapter(DaznChapterEnum.SignIn);
    };

const onClickSignUp =
    (stringLabel: ResourceStringLabel | '', resourceString: string) =>
    (event: MouseEvent<HTMLButtonElement>): void => {
        event.preventDefault();

        triggerElementClick({
            section: ElementSection.Header,
            itemId: stringLabel,
            resourceString,
        });
        setCurrentChapter({
            chapterName: DaznChapterEnum.Auth,
            chapterPath: '/account/payment-plan',
        });
    };

const onClickLogo = (headerRef: HeaderRef) => (): void => {
    triggerElementClick({
        section: ElementSection.Header,
        itemId: 'dazn_logo',
        resourceString: '',
    });

    scrollIntoHeader(headerRef);
};

export const SuspensedHeader: FC = () => {
    const [headerRef, setHeaderRef] = useState<HTMLElement | null>();
    const hasScrolledBelowFold = useHasScrolledBelowFold(headerRef);
    const headerSignUpStyle = getHeaderSignupStyle();
    const signupBannerStyle = getSignupBannerStyle(hasScrolledBelowFold);

    const { HeaderFreeTrial, HeaderSignUp, HeaderSignIn } = ResourceStringsKeys;

    const signupKey = useSignupKey({
        ctaFreeTrialKey: HeaderFreeTrial,
        ctaSignUpKey: HeaderSignUp,
    });
    const signUpStringLabel = useResourceStringKey(signupKey);
    const signUpCopy = useLabelKey({ stringKey: signUpStringLabel });

    const signInStringLabel = useResourceStringKey(HeaderSignIn);
    const signInCopy = useLabelKey({ stringKey: signInStringLabel });

    return (
        <header css={headerStyle} ref={setHeaderRef} data-testid="HEADER">
            <span css={logoStyle} onClick={onClickLogo(headerRef)} data-testid="HEADER_LOGO_ANCHOR">
                <Icon name="dazn" />
            </span>

            <Button
                id="HEADER_SIGN_UP"
                css={headerSignUpStyle}
                theme={ButtonsThemeEnum.PrimaryDarkBg}
                size={buttonsSizeStyle.Small}
                onClick={onClickSignUp(signUpStringLabel, signUpCopy)}
            >
                <Label stringKey={signUpStringLabel} />
            </Button>

            <Button
                id="HEADER_SIGN_IN"
                theme={ButtonsThemeEnum.SecondaryDarkBg}
                size={buttonsSizeStyle.Small}
                onClick={onClickSignIn(signInStringLabel, signInCopy)}
            >
                <Label stringKey={signInStringLabel} />
            </Button>

            <div css={signupBannerStyle}>
                <Button
                    id="HEADER_SIGN_UP_BANNER"
                    theme={ButtonsThemeEnum.PrimaryDarkBg}
                    size={buttonsSizeStyle.Large}
                    onClick={onClickSignUp(signUpStringLabel, signUpCopy)}
                    cta
                >
                    <Label stringKey={signUpStringLabel} />
                </Button>
            </div>
        </header>
    );
};

export const Header: FC = () => (
    <Suspense fallback={null}>
        <SuspensedHeader />
    </Suspense>
);
