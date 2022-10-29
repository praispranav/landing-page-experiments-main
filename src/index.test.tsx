import { render } from '@testing-library/react';
import ReactDOM from 'react-dom';
import { IDazn } from 'types/dazn';

import { Experiments } from './index';

jest.mock('@utils/dazn/Region');

describe('Experiments', () => {
    window.dazn = {
        lifecycle: { onChapterUnload: jest.fn() },
        features: {
            // eslint-disable-next-line id-length
            getVariableStringAnonymous: jest.fn().mockReturnValue('DEFAULT'),
            isEnabledAnonymous: jest.fn().mockReturnValue('DEFAULT'),
        },
        captureException: jest.fn(),
        chapterHistory: { currentChapter: '' },
    } as unknown as IDazn;

    const root = {} as HTMLElement;

    it('calls onChapterUnload', () => {
        render(<Experiments root={root} />);
        expect(window.dazn.lifecycle.onChapterUnload).toBeCalledWith(expect.any(Function));
    });

    it('calls unmountComponentAtNode whith the correct dom element', () => {
        jest.spyOn(ReactDOM, 'unmountComponentAtNode').mockImplementation((element) =>
            Boolean(element),
        );
        const onChapterUnloadMock = (fn: () => Promise<void>): void => {
            fn();
        };
        window.dazn.lifecycle.onChapterUnload = onChapterUnloadMock;

        render(<Experiments root={root} />);
        expect(ReactDOM.unmountComponentAtNode).toBeCalledWith(root);
    });
});
