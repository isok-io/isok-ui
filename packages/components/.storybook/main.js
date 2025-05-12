

import { join, dirname } from "path"

/**
* This function is used to resolve the absolute path of a package.
* It is needed in projects that use Yarn PnP or are set up within a monorepo.
*/
function getAbsolutePath(value) {
  return dirname(require.resolve(join(value, 'package.json')))
}

/** @type { import('@storybook/web-components-webpack5').StorybookConfig } */
const config = {
  "stories": [
    "./*.mdx",
    "../components/**/**/*.stories.@(js|jsx|mjs|ts|tsx)"
  ],
  "addons": [
    getAbsolutePath('@storybook/addon-essentials')
  ],
  "framework": {
    "name": getAbsolutePath('@storybook/web-components-webpack5'),
    "options": {}
  },
  core: {
    builder: 'webpack5'
  },
  webpackFinal: async (config) => {
    config.module.rules = config.module.rules.filter(
        rule => !(rule.use && rule.use.loader && rule.use.loader.includes('swc'))
    );

    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env', { targets: 'defaults' }],
            ['@babel/preset-typescript', { decoratorsBeforeExport: true }]
          ],
          plugins: [
            ['@babel/plugin-proposal-decorators', { legacy: true }],
            ['@babel/plugin-proposal-class-properties', { loose: true }]
          ]
        }
      }
    });

    return config;
  }
};
export default config;