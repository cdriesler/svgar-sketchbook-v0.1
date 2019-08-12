 module.exports = {
    module: {
        defaulltRules: [
          {
            type: "javascript/auto",
            resolve: {}
          },
        ],
        rules: [
          {
            test: /\.wasm$/,
            type: "javascript/auto", // ← !!
            loader: "file-loader",
            options: {
              publicPath: "dist/"
            }
          }
        ]
      }
 }
