const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]", // Output images in 'dist/images' directory
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]", // Output fonts in 'dist/fonts' directory
        },
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin(),
      // Minify CSS
      new MiniCssExtractPlugin(),

      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.sharpMinify,
          options: {
            encodeOptions: {
              jpeg: {
                // https://sharp.pixelplumbing.com/api-output#jpeg
                quality: 10,
              },
              webp: {
                // https://sharp.pixelplumbing.com/api-output#webp
                lossless: false,
              },
              avif: {
                // https://sharp.pixelplumbing.com/api-output#avif
                lossless: false,
              },

              // png by default sets the quality to 100%, which is same as lossless
              // https://sharp.pixelplumbing.com/api-output#png
              png: { quality: 10 },

              // gif does not support lossless compression at all
              // https://sharp.pixelplumbing.com/api-output#gif
              gif: {},
            },
          },
        },
      }),
    ],
  },
  plugins: [
    // Extract minified CSS into a separate file
    new MiniCssExtractPlugin({ filename: "style.css" }),
  ],
};
