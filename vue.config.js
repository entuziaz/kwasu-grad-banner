const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,

  devServer: {
    hot: true, // Enable HMR
    port: 8081, // Optional: change the port
  },
})
