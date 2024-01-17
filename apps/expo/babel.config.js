/** @type {import("@babel/core").ConfigFunction} */
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
    plugins: [
      "transform-inline-environment-variables",
      require.resolve("expo-router/babel"),
      require.resolve("react-native-reanimated/plugin"),
    ],
  };
};
