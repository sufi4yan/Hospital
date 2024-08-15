const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.js',  // First entry point
    admin: './src/script2.js' // Second entry point
  },
  
  output: {
    filename: '[name].bundle.js', // Output file names will be based on entry point names
    path: path.resolve(__dirname, 'dist') // Output directory
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Exclude node_modules
        use: {
          loader: 'babel-loader' // Use Babel to transpile JavaScript
        }
      },
      // You can add more rules here (e.g., for CSS or images)
    ]
  },
};
