const CracoLessPlugin = require("craco-less");
const CracoStyledJsx = require("craco-styled-jsx");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            // modifyVars: {
            //   "@primary-color": "#FE003E",
            //   "@link-color": "#FE003E",
            //   "@layout-body-background": "#f1f2f5",
            //   "@layout-header-background": "#ffffff",
            // },
            javascriptEnabled: true,
          },
        },
      },
    },
    {
      plugin: CracoStyledJsx,
      options: {
        sass: true, // Required node-sass to enable this option
        cssFileSupport: true, // Allow to write css in a standalone file
        cssFileTest: /\.styled\.(s)css$/,
      },
    },
  ],
};
