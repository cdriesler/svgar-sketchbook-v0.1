module.exports = {
    module: {
        rules: [
          {
            test: /\.wasm$/,
            type: 'javascript/auto',
            loader: 'file-loader'
          },
        ]
    }
}
