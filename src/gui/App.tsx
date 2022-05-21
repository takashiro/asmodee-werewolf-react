import React from 'react';

import Banner from './landmark/Banner';
import ContentInfo from './landmark/ContentInfo';
import PageSwitch from './landmark/PageSwitch';

export default function App(): JSX.Element {
	return (
		<>
			<header>
				<Banner />
			</header>
			<main>
				<PageSwitch />
			</main>
			<footer>
				<ContentInfo />
			</footer>
		</>
	);
}
