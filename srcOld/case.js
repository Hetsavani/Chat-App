// webpack.config.js

module.exports = {
    // Other webpack configurations...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  camelCase: false, // Disable camelCase transformation
                },
              },
            },
          ],
        },
      ],
    },
  };
  