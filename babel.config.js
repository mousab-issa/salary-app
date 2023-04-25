module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['@babel/plugin-transform-flow-strip-types'],
      ['@babel/plugin-proposal-decorators', { legacy: true }],
      ['@babel/plugin-proposal-class-properties', { loose: true }],
      ['react-native-reanimated/plugin'],
      [
        'module-resolver',
        {
          alias: {
            '@navigation': './src/navigation',
            '@components': './src/components',
            '@config': './src/config',
            '@screens': './src/screens',
            '@state': './src/store',
            '@assets': './assets',
            '@hooks': './hooks',
            '@utils': './src/utils',
            '@theme': './src/theme',
            '@services': './src/services',
            '@config': './src/config',
            '@common': './src/common',
            '@types': './src/types',
            '@i18n': './src/i18n',
            '@context': './src/context',
          },
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      ],
    ],
  };
};
