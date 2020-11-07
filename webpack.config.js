const path = require("path")

module.exports = {
  entry: [
    "./js/utils.js",
    "./js/server.js",
    "./js/data.js",
    "./js/debounce.js",
    "./js/pins.js",
    "./js/cards.js",
    "./js/mainPin.js",
    "./js/formUploadError.js",
    "./js/formUploadSuccess.js",
    "./js/imageUpload.js",
    "./js/form.js",
    "./js/filters.js",
    "./js/pageState.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
