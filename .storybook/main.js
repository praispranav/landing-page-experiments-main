const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

const mdxEmotionLoaderRenderer = `
  import React from 'react'
  import { jsx } from '@emotion/core'
  import { mdx as _mdx } from '@mdx-js/react'

  const mdx = (name, props, ...children) => {
    return (typeof name === 'string' || typeof name === 'symbol') && 
    !(props && 'css' in props) 
      ? _mdx(name, props, ...children) 
      : jsx(name, props, ...children)
  }
`;

module.exports = {
    stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.tsx', '../src/**/*.stories.jsx'],
    addons: [
        {
            name: '@storybook/addon-essentials',
            options: {
                actions: false,
            },
        },
        '@storybook/addon-links',
        'storybook-addon-turbo-build',
    ],
    babel: (config) => {
        config.presets.push(require.resolve('@emotion/babel-preset-css-prop'));
        return config;
    },
    webpackFinal: async (config) => {
        config.resolve.plugins = [
            new TsconfigPathsPlugin({ extensions: config.resolve.extensions }),
        ];

        config.module.rules[4].use[1].options.renderer = mdxEmotionLoaderRenderer;
        return config;
    },
};
