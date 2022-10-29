import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    failureThreshold: 0.01,
    failureThresholdType: 'percent', // percent of image or number of pixels
    customDiffConfig: { threshold: 0.3 }, // threshold for each pixel
    customSnapshotsDir: 'cypress/snapshots',
    capture: 'fullPage',
});
