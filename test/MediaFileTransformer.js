const path = require('path');

// Mocks every media file to return its filename. Makes it possible to test that
// the correct images are loaded for components.

const process = (_, filename) => `module.exports = '${path.basename(filename)}';`;
module.exports = { process };
