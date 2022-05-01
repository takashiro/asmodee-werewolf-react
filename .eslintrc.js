module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'plugin:react/recommended',
		'airbnb',
		'plugin:@typescript-eslint/recommended',
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
	],
	rules: {
		'import/extensions': [
			'error',
			'ignorePackages',
			{
				ts: 'never',
				tsx: 'never',
				js: 'never',
			},
		],
		'consistent-return': 'off',
		indent: [
			'error',
			'tab',
		],
		'linebreak-style': 'off',
		'max-len': 'off',
		'no-await-in-loop': 'off',
		'no-continue': 'off',
		'no-plusplus': 'off',
		'no-param-reassign': 'off',
		'no-restricted-syntax': [
			'error',
			'WithStatement',
		],
		'no-shadow': 'off',
		'no-tabs': 'off',
		'no-use-before-define': 'off',
		'react/jsx-indent-props': [
			'error',
			'tab',
		],
		'react/jsx-filename-extension': [
			'error',
			{ extensions: ['.tsx'] },
		],
		'react/jsx-indent': [
			'error',
			'tab',
		],
		'react/jsx-no-bind': 'off',
		'react/jsx-props-no-spreading': 'off',
		'react/require-default-props': 'off',
	},
	settings: {
		'import/resolver': { typescript: {} },
	},
};
