module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
      'react-native-reanimated/plugin', // Make sure this is the last item in the plugins array
  ],
};