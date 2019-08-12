module.exports = {
    transpileDependencies: [
        //'rhino3dm',
    ],
    chainWebpack: config => {
        config.module
        .rule('wasm')
        .test(/\.wasm$/)
        .use("file-loader")
        .loader("file-loader")
        .tap(opt => {
            opt["type"] = "javascript/auto"
        })
        .end()
    }
  }