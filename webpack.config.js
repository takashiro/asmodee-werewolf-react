const path = require('path');

let mode = 'production';
if (process.env.NODE_ENV === 'development') {
	mode = 'development';
}

module.exports = {
	mode: mode,
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'js')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['babel-preset-env']
					}
				},
			}
		]
	}
};
