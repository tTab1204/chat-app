const { override, addWebpackAlias } = require('customize-cra');
const addLessLoader = require('customize-cra-less-loader');
const path = require('path');

module.exports = override(
  addLessLoader({
    lessLoaderOptions: {
      lessOptions: {
        modifyVars: {
          'primary-color': '#1DA57A',
          'link-color': '#1DA57A',
          'border-radius-base': '2px',
        },
        javascriptEnabled: true,
      },
    },
  }),
  addWebpackAlias({
    //'@': path.resolve(__dirname, 'src'),
    '@components': path.resolve(__dirname, 'src/components'),
    '@styles': path.resolve(__dirname, 'src/styles'),
    '@pages': path.resolve(__dirname, 'src/pages'),
    '@assets': path.resolve(__dirname, 'src/assets'),
    '@redux': path.resolve(__dirname, 'src/redux'),
  }),
);
