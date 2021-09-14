/**
 * @type {import('@karuta/linguist').Config}
 */
module.exports = {
	locales: [
		'en-US',
		'en-GB',
		'zh-Hans',
		'zh-Hant',
		'zh-yue',
	],
	overrideIdFn: '[sha512:contenthash:base64:6]',
};
