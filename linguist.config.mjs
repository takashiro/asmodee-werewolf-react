/**
 * @type {import('@karuta/linguist').Config}
 */
export default {
	locales: [
		'en-US',
		'en-GB',
		'zh-Hans',
		'zh-Hant',
		'yue',
		'ja',
	],
	overrideIdFn: '[sha512:contenthash:base64:6]',
};
