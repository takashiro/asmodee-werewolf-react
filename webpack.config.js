/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { transform } = require('@karuta/linguist');
const { default: api } = require('@asmodee/werewolf-server');

/**
 * @return {import('webpack').Configuration} Webpack configuration
 */
module.exports = function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			app: './src/index.tsx',
		},
		output: {
			filename: 'static/[name].js',
			path: path.resolve(__dirname, 'dist'),
		},
		resolveLoader: {
			modules: [path.resolve(__dirname, 'node_modules')],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
			],
		},
		optimization: {
			splitChunks: {
				cacheGroups: {
					vendors: {
						test: /node_modules/,
						name: 'vendor',
						enforce: true,
						chunks: 'all',
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'ts-loader',
						options: {
							getCustomTransformers() {
								return {
									before: [
										transform(),
									],
								};
							},
						},
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
								sourceMap: mode === 'development',
							},
						},
						{
							loader: 'sass-loader',
							options: {
								sourceMap: mode === 'development',
							},
						},
					],
				},
			],
		},
		plugins: [
			new MiniCssExtractPlugin({
				filename: 'static/[name].css',
			}),
			new HtmlWebpackPlugin({
				template: 'src/index.html',
			}),
		],
		devtool: mode === 'production' ? undefined : 'source-map',
		devServer: {
			static: path.join(__dirname, 'dist'),
			compress: true,
			port: 9526,
			hot: true,
			onBeforeSetupMiddleware(server) {
				server.app.use('/api', api);
			},
		},
	};
};
