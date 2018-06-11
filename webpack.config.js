const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

let mode = 'production';
if (process.env.NODE_ENV === 'development') {
	mode = 'development';
}

module.exports = {
	mode: mode,
	entry: {
		app: './src/index.js'
	},
	output: {
		filename: '[name].js',
		path: path.resolve(__dirname, 'dist/static')
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
				use: [
					MiniCssExtractPlugin.loader,
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
				],
			}
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css',
		})
	],
	devtool: mode === 'production' ? undefined : 'source-map',
};
