import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import ShareLink from './ShareLink';

const msg = defineMessages({
	linkTitle: { defaultMessage: 'Invite Link' },
});

interface ShareAreaProps {
	roomId: number;
}

export default function ShareArea({ roomId }: ShareAreaProps): JSX.Element {
	const intl = useIntl();
	const titleId = React.useId();
	return (
		<section className="box share-link-area" aria-labelledby={titleId}>
			<h2 id={titleId}>
				{intl.formatMessage(msg.linkTitle)}
			</h2>
			<ShareLink id={roomId} />
		</section>
	);
}
