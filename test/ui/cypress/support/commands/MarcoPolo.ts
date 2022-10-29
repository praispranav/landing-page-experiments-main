import { IDevice } from 'types/dazn/MarcoPolo';
import { addGetMarcoPoloTokenCommand } from '../../plugins/MarcoPolo/command';

const axios = require('axios');

const getMarcoPoloUrl = (guid: string) =>
    `https://api.marcopolo.acc.dazn-stage.com/v1/override/${guid}`;

interface ISetOverrideResponse {
    id: string;
    maintainer_id: string;
    _meta: {
        nickname: string;
        update_date: Date;
    };
    base: {
        country: string;
        subdivision: string;
        lat: number;
        long: number;
    };
    expiry_date: number;
}

addGetMarcoPoloTokenCommand();

Cypress.Commands.add(
    'setMarcoPoloCountry',
    (country: string, device: IDevice): Cypress.Chainable<ISetOverrideResponse> => {
        const expiryDate = (Date.now() + 1 * 60 * 60 * 1000) / 1000;

        return cy.getMarcoPoloToken().then((token) =>
            axios({
                method: 'post',
                headers: {
                    Authorization: `Bearer bot:${token}`,
                    'x-dazn-marco': '',
                    'x-dazn-device': device.id,
                },
                url: getMarcoPoloUrl(device.guid),
                data: {
                    _meta: { nickname: 'my-new-device-on-lp-chapter-test' },
                    base: { country },
                    // eslint-disable-next-line @typescript-eslint/naming-convention
                    expiry_date: expiryDate,
                },
            }).then((response: ISetOverrideResponse) => {
                Cypress.log({ message: `SET MARCO POLO FOR ${country}` });
                return response;
            }),
        );
    },
);

Cypress.Commands.add('enableMarcoPolo', (country: string): void => {
    cy.log(`Marco Polo for ${country} enabled`);
    cy.window()
        .should('have.property', 'dazn')
        .then((dazn: any) => {
            cy.setMarcoPoloCountry(country, dazn.device);
            dazn.devMode.enable();
        });

    cy.reload();
});

