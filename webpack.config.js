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
	resolveLoader: {
		modules: [path.resolve(__dirname, 'node_modules')]
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: mode === 'production' ? {
						presets: ['babel-preset-env']
					} : {}
				},
			}
		]
	}
};
