const path = require('path')
const sass = require('sass')
const sassUtils = require("node-sass-utils")(sass);
const theme = require("./src/theme");

module.exports = {
  entry: {
    index: './src/components/index.ts'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
    clean: true,
    library: {
      name: 'SWUI',
      type: 'umd',
    }
  },
  module: {
    rules: [
      { test: /\.(js|ts|tsx)$/i, use: 'babel-loader' },
      { test: /\.s[ac]ss$/i, use: [
        'style-loader', 
        { loader: 'css-loader', options: { importLoaders: 2 } }, 
        {
          loader: 'postcss-loader', options: { 
            postcssOptions: { plugins: [
              ['postcss-preset-env', { browsers: ['last 2 version', '>1%'] }]
            ]}
          }
        }, 
        { loader: 'sass-loader', options: {
          sassOptions: {
            functions: {
              "theme($valPath)": function (valPath) {
                // valPath is instance of sass.types.String
                const pathArr = valPath.getValue().split(".");
                let res = theme;
                for (let key of pathArr) {
                  res = res[key];
                  if (!res)
                    throw new Error(`there is no ${valPath} in the theme`);
                }
                return sassUtils.castToSass(res);
              },
            },
          },
        }}
      ]}
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@sw-ui': path.resolve(__dirname, './src/components/'),
      'src': path.resolve(__dirname, './src')
    }
  },
  mode: 'none',
  // mode: 'production'
}