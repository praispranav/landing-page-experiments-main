/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */

const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

const moduleNameMapper = pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/src/',
});

module.exports = {
    coverageDirectory: './coverage/',
    collectCoverageFrom: [
        'src/**/*.{ts,tsx}',
        '!src/**/{__stories__,types,Types,configs}/**/*.ts?(x)',
        '!src/**/*{.stories,Types,Sports}.ts?(x)',
    ],
    coverageThreshold: {
        global: {
            statements: 96,
            branches: 82,
            functions: 92,
            lines: 96,
        },
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.test.json',
        },
    },
    moduleNameMapper,
    preset: 'ts-jest',
    resetMocks: true,
    restoreMocks: true,
    roots: ['<rootDir>/src/'],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    transform: {
        '^.+\\.jsx?$': 'babel-jest',
        '\\.(jpg|ico|jpeg|png|gif|webp|svg)$': '<rootDir>/test/MediaFileTransformer.js',
    },
    transformIgnorePatterns: ['/node_modules/(?!@dazn/discovery-web-module-components)'],
    verbose: true,
};
