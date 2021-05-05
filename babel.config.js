module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./app'],
        alias: {
          test: './test',
          underscore: 'lodash',
          assets: './app/assets',
          components: './app/components',
          navigations: './app/navigations',
          styles: './app/styles',
          utils: './app/utils',
          redux: './app/redux',
        },
      },
    ],
  ],
};
