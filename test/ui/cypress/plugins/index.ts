import { addMatchImageSnapshotPlugin } from 'cypress-image-snapshot/plugin';
import { addMarcoPoloPlugin } from './MarcoPolo';

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
    addMarcoPoloPlugin(on);
    addMatchImageSnapshotPlugin(on, config);
};
