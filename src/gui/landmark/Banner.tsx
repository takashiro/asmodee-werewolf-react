import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

const desc = defineMessages({
	title: { defaultMessage: 'Game Assistant for Werewolves of Miller\'s Hollow' },
});

export default function Banner(): JSX.Element {
	const intl = useIntl();

	const title = intl.formatMessage(desc.title);
	React.useEffect(() => {
		document.title = title;
	});

	return (
		<h1>
			<img id="title" src="style/logo.webp" alt={title} />
		</h1>
	);
}
