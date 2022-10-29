# Landing Page Experiments

![team](https://img.shields.io/badge/team-odyssey-blue)

## Storybook

1. Go to https://terebu.daznplatform.io/ and login using your DAZN credentials.
2. Go to [💅 Storybook](https://terebu.daznplatform.io/landing-page-experiments/dev/main/latest/storybook/index.html).

## Description

This repository contains and exports a SystemJS `<Experiments />` React component that should be consumed using the `@dazn/package-loader` system.

## Development

Development should be done entirely through Storybook: `npm run storybook`.

Consumers of this package only render the `<Experiments />` component (check `src/index.tsx`) hence you should create stories for every experiment variant (by mocking them).

Check the `Experiments.story.mdx` file to add stories for different variants.

### Testing
Running the unit tests: `npm run test`

Running the linter: `npm run lint`

[Guide on how to run our UI tests](./test/ui/cypress/support/README.md)

### Simulating local development on \*.dazn.com environments

`npm run start:dev` will start the local webpack dev server and serve the SystemJS package under `http://localhost:9000/dist/index.js`.

To see this code running on test/stag.dazn.com environments you can simply go to a landing page, for instance on stag you can go to https://stag.dazn.com/en-DE/l/welcome (use VPN on tunnel). Point here is to find a URL that loads the `landing-page-web-chapter` code. Then you can tell the chapter to load your local running instance of the package (`http://localhost:9000/dist/index.js`) instead of fetching the one live (`https://pkg.fe.indazn.com/@dazn/landing-page-experiments/lib/0.0.15/dist/index.js`) by setting a value in localStorage:

```js
window.localStorage.setItem(
    '@dazn/landing-page-experiments/developmentPath',
    'http://localhost:9000',
);
```

After running this command (with your `npm run start:dev` server running) you should be able to see your code.

For more info on this API please refer to the [package-loader docs](https://github.com/getndazn/package-loader).

### Storybook

All the sections, containers and design system components need to be added into storybook with MDX stories. This is to pave the way for the proper documentation of all our components.

To run it, use the command `npm run storybook`

### Upload & Deployment

Deployment happens similar to chapters, even though this is an async lib. It's done in 2 steps (upload & deploy):

1. Uploading the package using the package-upload-drone-plugin (https://github.com/getndazn/package-upload-drone-plugin). This step takes the tarball build of the project (ex. dazn-landing-page-experiments-0.0.10.tgz) and uploads it to the FED API. It happens only when a tag is pushed to git and should be done via the releases page on github (this automatically creats a git tag behind the scenes): https://github.com/getndazn/landing-page-experiments/releases

2. The 2nd step is about taking the uploaded package from the earlier step and deploying it to an environment. This can be done only via the FEDD (frontend deployment dashboard): https://deployments.daznplatform.io/ -- you'll see the version appearing there once the package was uploaded from the upload step.

### Commands

#### Run Storybook

`npm run storybook`

#### Terraform formatting

`npm run format`

#### Build drone pipelines

`npm run build-pipeline`

### e2e and integration tests
Please look at the documentation [here]('./test/ui/cypress/support/README.md')
## Support

### Runbooks

TBD
