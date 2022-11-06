import React from 'react';
import { createRoot } from 'react-dom/client';

import { createLocale, predictDefaultLanguage } from './model/Locale';
import App from './gui';

import './global.scss';

(async function main(): Promise<void> {
	const defaultLanguage = predictDefaultLanguage();
	const defaultLocale = await createLocale(defaultLanguage);

	const container = document.getElementById('root');
	if (!container) {
		throw new Error('The HTML template is corrupted.');
	}
	const root = createRoot(container);
	root.render(
		<App
			defaultLocale={defaultLocale}
		/>,
	);
}());
