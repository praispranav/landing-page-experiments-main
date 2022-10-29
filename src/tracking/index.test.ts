import { triggerElementClickEvent, triggerErrorImpressionEvent } from '@dazn/fe-events';
import { DaznError } from '@utils/dazn/DaznError';
import { IDazn } from 'types/dazn/index';

import { ElementSection, EventPayload } from './events.types';
import { callbackListener, triggerElementClick, triggerErrorImpression } from './index';

jest.mock('@dazn/fe-events');

describe('GA tracking', () => {
    const originalDataLayer = window.dataLayer;

    window.dazn = {
        startupData: {
            Region: {
                Country: 'de',
                Language: 'en',
                Currency: 'eur',
            },
        },
    } as IDazn;

    beforeEach(() => {
        window.dataLayer = [];
    });

    afterAll(() => {
        window.dataLayer = originalDataLayer;
    });

    describe('callbackListener', () => {
        const payload = {
            test: 'test',
        } as unknown as EventPayload;

        it('should be able to add data into dataLayer array', () => {
            callbackListener(payload, {
                deprecated: false,
                gtm: true,
                name: 'test',
            });

            expect(window.dataLayer).toHaveLength(1);
        });

        it('should be able to add data into dataLayer array, even when the dataLayer is null', () => {
            window.dataLayer = null;
            callbackListener(payload, {
                deprecated: false,
                gtm: true,
                name: 'test',
            });

            expect(window.dataLayer).toHaveLength(1);
        });

        it('should ignore if meta.deprecated is true', () => {
            callbackListener(payload, {
                deprecated: true,
                gtm: true,
                name: 'test',
            });

            expect(window.dataLayer).toHaveLength(0);
        });

        it('should ignore if meta.gtm is false', () => {
            const meta = {
                deprecated: false,
                gtm: false,
                name: 'test',
            };
            callbackListener(payload, meta);

            expect(window.dataLayer).toHaveLength(0);
        });
    });

    describe('triggerElementClick', () => {
        it('should push a buttonClick into the dataLayer', () => {
            const section = ElementSection.Header;
            const itemId = 'landingpages_web_header_button_signIn';
            const resourceString = 'SIGN IN';

            triggerElementClick({ section, itemId, resourceString });

            expect(triggerElementClickEvent).toHaveBeenCalledWith({
                element: {
                    type: section,
                    itemType: 'element',
                    itemId,
                    itemName: resourceString,
                },
            });
        });
    });

    describe('triggerErrorImpression', () => {
        it('should push an error impression into the dataLayer trough triggerErrorImpressionEvent', () => {
            const error = new DaznError({
                name: 'foo-service',
                category: 73,
                httpStatus: 401,
                code: '1000',
                message: 'something went wrong',
            });
            triggerErrorImpression('silent', error);

            expect(triggerErrorImpressionEvent).toHaveBeenCalledWith({
                error: { itemId: '73-000-401', itemType: 'error', type: 'silent' },
            });
        });

        it('should not push an error impression when there is no error', () => {
            triggerErrorImpression('silent');

            expect(triggerErrorImpressionEvent).not.toHaveBeenCalled();
        });
    });
});
