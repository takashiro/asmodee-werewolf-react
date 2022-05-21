import React from 'react';
import ReactDOM from 'react-dom';

import { createLocale, predictDefaultLanguage } from './model/Locale';
import App from './gui';

import './global.scss';

(async function main(): Promise<void> {
	const defaultLanguage = predictDefaultLanguage();
	const defaultLocale = await createLocale(defaultLanguage);

	ReactDOM.render(
		<App
			defaultLocale={defaultLocale}
		/>,
		document.getElementById('root'),
	);
}());
