import React from 'react';
import ReactDOM from 'react-dom';
import {
	createIntl,
	createIntlCache,
	RawIntlProvider,
} from 'react-intl';

import { locale } from './model/Locale';

import './global.scss';
import App from './gui/App';

const intlCache = createIntlCache();

(async function main(): Promise<void> {
	document.documentElement.lang = locale.getLanguage();
	const messages = await locale.loadMessage();

	const intl = createIntl({
		locale: 'en-US',
		messages,
	}, intlCache);

	ReactDOM.render(
		<RawIntlProvider value={intl}>
			<App />
		</RawIntlProvider>,
		document.getElementById('root'),
	);
}());
