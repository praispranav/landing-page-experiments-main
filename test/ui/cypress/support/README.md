## Guide on how to run our E2E tests
To run our E2E tests you need:
- Run `brew install vault`
- Access the `tests/cypress` folder
- Install the npm dependencies, and execute the following command:

```
VAULT_MP_TOKEN='x.xxxxxxxxxxxxxx.xxxxx' npm run test:open
```
As we employ the Marco Polo API to simulate the E2E access on multiple countries, you will have to pass a vault token before running them, so the test suite can generate an Authorization token for our registered ACC Bot, so we can be authenticated when interacting with Marco Polo.

More on the ACC Bots available here:
https://docs.acc.dazn-dev.com/guides/using-bots/

### How to obtain the VAULT_MP_TOKEN?
To obtain the `VAULT_MP_TOKEN` value, you need to have permissions granted for accessing the AWS DAZN-ACC-* account, and run the following script: 

```sh
bash bot-token.sh stage landingpage-web-chapter
```
