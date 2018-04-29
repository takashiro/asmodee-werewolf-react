const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

let mode = 'production';
if (process.env.NODE_ENV === 'development') {
	mode = 'development';
}

module.exports = {
	mode: mode,
	entry: './src/index.js',
	output: {
		filename: 'app.js',
		path: path.resolve(__dirname, 'static')
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
			},
			{
				test: /\.scss$/,
				exclude: /node_modules/,
				use: ExtractTextPlugin.extract([
					{
						loader: 'css-loader',
						options: {
							url: false,
							minimize: mode === 'production',
							sourceMap: mode === 'development',
						}
					},
					{
						loader: 'sass-loader',
						options: {
							url: false,
							sourceMap: mode === 'development',
						}
					},
				]),
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('app.css')
	],
	devtool: mode === 'production' ? undefined : 'source-map',
};
