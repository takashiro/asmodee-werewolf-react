import path from 'path';
import url from 'url';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { transform } from '@karuta/linguist';
import api from '@asmodee/werewolf-server';

const rootDir = path.dirname(url.fileURLToPath(import.meta.url));

/**
 * @return {import('webpack').Configuration} Webpack configuration
 */
export default function config(env, argv) {
	const mode = argv && argv.mode === 'development' ? 'development' : 'production';
	return {
		mode,
		entry: {
			app: './src/index.tsx',
		},
		output: {
			filename: 'static/[name].js',
			path: path.resolve(rootDir, 'dist'),
		},
		resolveLoader: {
			modules: [path.resolve(rootDir, 'node_modules')],
		},
		resolve: {
			extensions: [
				'.ts',
				'.tsx',
				'.js',
			],
			alias: {
				'@formatjs/icu-messageformat-parser': '@formatjs/icu-messageformat-parser/no-parser',
			},
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
			static: path.join(rootDir, 'dist'),
			compress: true,
			port: 9526,
			hot: true,
			setupMiddlewares(middlewares, server) {
				server.app.use('/api', api);
				return middlewares;
			},
		},
	};
}
