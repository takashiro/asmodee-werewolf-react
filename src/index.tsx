import React from 'react';
import ReactDOM from 'react-dom';
import {
	createIntl,
	createIntlCache,
	RawIntlProvider,
} from 'react-intl';

import Locale from './model/Locale';

import App from './gui/App';
import LocaleList from './gui/LocaleList';

import './global.scss';

const locale = new Locale();
const intlCache = createIntlCache();

function handleLanguageSelect(lang: string): void {
	window.location.search = `lang=${lang}`;
}

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

	ReactDOM.render(
		<RawIntlProvider value={intl}>
			<LocaleList
				languages={Locale.getLanguages()}
				onSelect={handleLanguageSelect}
			/>
		</RawIntlProvider>,
		document.getElementById('locale-switch'),
	);
}());
