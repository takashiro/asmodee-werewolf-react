import React from 'react';
import { IntlProvider } from 'react-intl';
import Locale, {
	createLocale,
	setPreferredLanguage,
} from '../model/Locale';

import Banner from './landmark/Banner';
import ContentInfo from './landmark/ContentInfo';
import PageSwitch from './landmark/PageSwitch';

import './index.scss';

interface AppProps {
	defaultLocale: Locale;
}

export default function App({
	defaultLocale,
}: AppProps): JSX.Element {
	const [locale, setLocale] = React.useState(defaultLocale);

	const updateLocale = React.useCallback(async (language: string) => {
		const locale = await createLocale(language);
		setLocale(locale);
		setPreferredLanguage(language);
	}, []);

	React.useEffect(() => {
		document.documentElement.lang = locale.language;
	});

	return (
		<IntlProvider
			locale={locale.language}
			messages={locale.messages}
		>
			<header>
				<Banner />
			</header>
			<main>
				<PageSwitch />
				<div id="overlay" />
			</main>
			<footer>
				<ContentInfo
					onLanguageChange={updateLocale}
				/>
			</footer>
		</IntlProvider>
	);
}
