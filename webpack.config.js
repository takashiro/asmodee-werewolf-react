const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const pkg = require('./package.json');

module.exports = function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode: mode,
		entry: {
			app: './src/index.js',
			vendor: Object.keys(pkg.dependencies),
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist/static')
		},
		resolveLoader: {
			modules: [path.resolve(__dirname, 'node_modules')]
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendor',
						enforce: true,
						chunks: 'all'
					}
				}
			}
		},
		module: {
			rules: [
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: 'babel-loader',
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
								sourceMap: mode === 'development'
							}
						},
						{
							loader: 'sass-loader',
							options: {
								url: false,
								sourceMap: mode === 'development'
							}
						},
					],
				}
			]
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: '[name].css',
				chunkFilename: '[name].css',
			})
		],
		devtool: mode === 'production' ? undefined : 'source-map',
	};
};
