import { MARCO_POLO_TASK_NAME } from './constants';
import { withToken } from '@dazn/acc-sdk-vault';
import { GetResponse } from '@dazn/acc-sdk-vault/lib/types';
import { FetchWithTokenOptions } from '@dazn/acc-sdk-vault/lib/utils';

const awsAccount = 240680620468; // DAZN-ACC-STAGE
const host = 'vault-eu-central-1.vault.dazn-stage.com';
const keyPath = `kv/data/${awsAccount}/bots/landingpage-web-chapter-marcopolo-e2e`;

let secret = '';

export const addMarcoPoloPlugin = (on: Cypress.PluginEvents) => {
    const getMarcoPoloSecret = async (token: string) => {
        if (secret) {
            return secret;
        }

        const fetchOptions: FetchWithTokenOptions = {
            host,
            token,
            keyPath,
            namespace: 'acc-user-management',
        };

        try {
            if (!token) {
                throw new Error('Missing Marco Polo token');
            }

            const marcoPoloSecret = (await withToken.fetchSecret(fetchOptions)) as GetResponse;
            secret = marcoPoloSecret.data.data.secret;

            return secret;
        } catch (e) {
            console.log(`${MARCO_POLO_TASK_NAME} failed.`, fetchOptions);
            console.error(e);

            throw e;
        }
    };

    on('task', { [MARCO_POLO_TASK_NAME]: getMarcoPoloSecret });
};
