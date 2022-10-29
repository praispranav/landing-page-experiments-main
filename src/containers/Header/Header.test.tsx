// eslint-disable-next-line jest/no-mocks-import
import { renderWithVariantConfig } from '@experiments/__mocks__/MockProviderConfig';
import { fireEvent, queryByAttribute, render } from '@testing-library/react';
import { ElementSection } from '@tracking/events.types';
import { triggerElementClick } from '@tracking/index';
import { setCurrentChapter } from '@utils/dazn/ChapterHistory';
import { DaznChapterEnum } from 'types/dazn/DaznChapterEnum';

import * as HeaderComponent from './Header';

jest.mock('@utils/dazn/ChapterHistory');

jest.mock('@tracking/index');

describe('Header', () => {
    const { Header } = HeaderComponent;
    const renderWithConfig = renderWithVariantConfig();

    describe('Logo click', () => {
        it('calls scrollIntoHeader and triggerElementClick when the logo is clicked', async () => {
            const spiedscrollIntoHeader = jest.spyOn(HeaderComponent, 'scrollIntoHeader');
            const { findByTestId } = render(<Header />);

            const logo = await findByTestId('HEADER_LOGO_ANCHOR');
            const header = await findByTestId('HEADER');
            logo.click();

            expect(spiedscrollIntoHeader).toBeCalledWith(header);
            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Header,
                itemId: 'dazn_logo',
                resourceString: '',
            });
        });
    });

    describe('CTA events', () => {
        const expectedSignUpLabel = 'landingpages_web_header_button_freeTrial';
        const expectedSignInLabel = 'landingpages_web_header_button_signIn';

        it('should set the chapterPath as /account/payment-plan and call triggerElementClick upon clicking on the sign up', async () => {
            const { container } = renderWithConfig(<Header />);

            const signUpButton = queryByAttribute("id", container, "HEADER_SIGN_UP") as HTMLElement

            signUpButton.click();
            fireEvent(signUpButton, new MouseEvent('click'));

            expect(setCurrentChapter).toHaveBeenCalledWith({
                chapterName: DaznChapterEnum.Auth,
                chapterPath: '/account/payment-plan',
            });

            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Header,
                itemId: expectedSignUpLabel,
                resourceString: signUpButton.textContent,
            });
        });

        it(`should set the chapterName=${DaznChapterEnum.SignIn} and call triggerElementClick upon clicking on the sign in`, async () => {
            const { container } = renderWithConfig(<Header />);
            const signInButton = queryByAttribute("id", container, "HEADER_SIGN_IN") as HTMLElement

            signInButton.click();
            fireEvent(signInButton, new MouseEvent('click'));

            expect(setCurrentChapter).toHaveBeenCalledWith(DaznChapterEnum.SignIn);
            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Header,
                itemId: expectedSignInLabel,
                resourceString: signInButton.textContent,
            });
        });

        it('should set the chapterPath as /account/payment-plan and call triggerElementClick upon clicking on the button in the banner', async () => {
            const { container } = renderWithConfig(<Header />);
            const signUpBannerButton = queryByAttribute("id", container, "HEADER_SIGN_UP_BANNER") as HTMLElement
            signUpBannerButton.click();
            fireEvent(signUpBannerButton, new MouseEvent('click'));

            expect(setCurrentChapter).toHaveBeenCalledWith({
                chapterName: DaznChapterEnum.Auth,
                chapterPath: '/account/payment-plan',
            });

            expect(triggerElementClick).toHaveBeenCalledWith({
                section: ElementSection.Header,
                itemId: expectedSignUpLabel,
                resourceString: signUpBannerButton.textContent,
            });
        });
    });

    describe('CTA contents', () => {
        it('should have a sign up button using the sign up copy', () => {
            const expectedSignUpLabel = 'Start your free month';
            const { container } = renderWithConfig(<Header />);
            const signUpButton = queryByAttribute("id", container, ("HEADER_SIGN_UP"))
            const signUpBannerButton = queryByAttribute("id", container, "HEADER_SIGN_UP_BANNER")

            expect(signUpButton).toHaveTextContent(expectedSignUpLabel);
            expect(signUpBannerButton).toHaveTextContent(expectedSignUpLabel);
        });
    });
});
