import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';

import App from './gui';

async function loadMessage(locale: string): Promise<Record<string, string>> {
	const res = await window.fetch(`./message/${locale}.json`);
	if (res.status === 200) {
		return res.json();
	}

	return loadMessage('en-US');
}

(async function main(): Promise<void> {
	const messages = await loadMessage('zh-CN');
	ReactDOM.render(
		<IntlProvider defaultLocale="en-US" locale="zh-CN" messages={messages}>
			<App />
		</IntlProvider>,
		document.getElementById('root'),
	);
}());
