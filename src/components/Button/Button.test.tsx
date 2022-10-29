import colors from '@components/Style/Colors';
import { ButtonsThemeEnum } from '@components/Style/Theme';
import { render } from '@testing-library/react';
import { lorem } from 'faker';

import { Button } from './Button';

describe('Button', () => {
    describe('Simple', () => {
        it('should render a button with text', async () => {
            const expectedText = lorem.word();
            const { findByText } = render(<Button>{expectedText}</Button>);

            const button = await findByText(expectedText);
            expect(button).toBeInTheDocument();
        });

        it('should render an anchor tag if it has href', async () => {
            const url = 'https://www.dazn.com';
            const expectedText = lorem.word();

            const { findByText } = render(<Button href={url}>{expectedText}</Button>);

            const anchor = await findByText(expectedText);
            expect(anchor.closest('a')).toHaveAttribute('href', url);
        });
    });

    describe.each`
        position
        ${'left'}
        ${'right'}
    `('Icon on the $position position', ({ position }) => {
        const expectedText = lorem.word();
        const expectedOrder = position === 'left' ? 0 : 1;

        it('should render a button with text and an icon', async () => {
            const vector = 'external_link';

            const icon = <Button.Icon position={position} vector={vector} />;
            const { findByTestId } = render(<Button icon={icon}>{expectedText}</Button>);

            const screenElement = await findByTestId(`BUTTON_ICON_${vector.toUpperCase()}`);
            expect(screenElement).toHaveStyleRule('order', expectedOrder.toString());
        });

        it('should render a button with text and an icon as a children', async () => {
            const icon = <Button.Icon position={position}>✅</Button.Icon>;
            const { findByTestId } = render(<Button icon={icon}>{expectedText}</Button>);

            const screenElement = await findByTestId(`BUTTON_ICON`);

            expect(screenElement).toHaveStyleRule('order', expectedOrder.toString());
            expect(screenElement).toHaveTextContent('✅');
        });
    });

    describe.each`
        theme                                | background        | color            | border
        ${ButtonsThemeEnum.PrimaryDarkBg}    | ${colors.neon}    | ${colors.tarmac} | ${'none'}
        ${ButtonsThemeEnum.SecondaryDarkBg}  | ${colors.mako}    | ${colors.chalk}  | ${'none'}
        ${ButtonsThemeEnum.OutlineDarkBg}    | ${'transparent'}  | ${colors.chalk}  | ${colors.chalk}
        ${ButtonsThemeEnum.TextDarkBg}       | ${colors.tarmac}  | ${colors.chalk}  | ${'none'}
        ${ButtonsThemeEnum.PrimaryLightBg}   | ${colors.tarmac}  | ${colors.chalk}  | ${'none'}
        ${ButtonsThemeEnum.SecondaryLightBg} | ${colors.asphalt} | ${colors.chalk}  | ${'none'}
        ${ButtonsThemeEnum.OutlineLightBg}   | ${'transparent'}  | ${colors.tarmac} | ${colors.tarmac}
        ${ButtonsThemeEnum.TextLightBg}      | ${colors.chalk}   | ${colors.tarmac} | ${'none'}
    `('Theme $theme', ({ theme, background, color, border }) => {
        it('should render a button with the styles for the theme', async () => {
            const expectedText = lorem.word();
            const { findByText } = render(<Button theme={theme}>{expectedText}</Button>);

            const screenElement = await findByText(expectedText);

            expect(screenElement).toHaveStyleRule('background', background);
            expect(screenElement).toHaveStyleRule('color', color);

            if (border === 'none') {
                return;
            }

            expect(screenElement).toHaveStyleRule('border-color', border);
        });
    });
});
