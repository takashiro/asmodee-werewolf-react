import React from 'react';
import { IntlProvider } from 'react-intl';
import Locale, { createLocale } from '../model/Locale';

import Banner from './landmark/Banner';
import ContentInfo from './landmark/ContentInfo';
import PageSwitch from './landmark/PageSwitch';

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
			</main>
			<footer>
				<ContentInfo
					onLanguageChange={updateLocale}
				/>
			</footer>
		</IntlProvider>
	);
}
