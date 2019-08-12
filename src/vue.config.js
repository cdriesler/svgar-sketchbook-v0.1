module.exports = {
    chainWebpack: config => {
      config.resolve.extensions.delete('.wasm')
    }
  }