import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import { locale } from './model/Locale';
import App from './gui';

(async function main(): Promise<void> {
	document.documentElement.lang = locale.getLanguage();
	const messages = await locale.loadMessage();
	ReactDOM.render(
		<IntlProvider
			defaultLocale="en-US"
			locale={locale.getLanguage()}
			messages={messages}
		>
			<App />
		</IntlProvider>,
		document.getElementById('root'),
	);
}());
