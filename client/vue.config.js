const path = require("path");

module.exports = {
  // SASS loading
  css: {
    loaderOptions: {
      sass: {
        prependData: `
                @import "@/assets/styles/_variables.scss";
              `,
      },
    },
  },
  // Random workaround
  transpileDependencies: ["@vue/reactivity"],
  // Redirect URLs for API queries
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
      },
    },
  },
  // Handle build
  outputDir: path.resolve(__dirname, '../server/public'),
};
