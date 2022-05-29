import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import { client } from '../../../model/Client';
import HttpError from '../../../model/HttpError';
import Room from '../../../model/Room';
import Page from '../../../model/Page';
import go from '../../../util/go';

import './index.scss';

const msg = defineMessages({
	roomNotExist: { defaultMessage: 'The room does not exist.' },
	unknownError: { defaultMessage: 'Unknown error.' },
	exit: { defaultMessage: 'Exit' },
	loading: { defaultMessage: 'Loading...' },
});

interface LoaderProps {
	id: number;
}

export default function RoomLoader({
	id,
}: LoaderProps): JSX.Element {
	const intl = useIntl();

	const [message, setMessage] = React.useState('');

	async function enterRoom(): Promise<void> {
		const room = new Room(client);
		if (!room.restore(id)) {
			try {
				await room.enter(id);
			} catch (error) {
				if (error instanceof HttpError && error.code === 404) {
					setMessage(intl.formatMessage(msg.roomNotExist));
				} else {
					setMessage(intl.formatMessage(msg.unknownError));
				}
				return;
			}
			room.save();
		}

		setTimeout(() => {
			go(Page.Room, { id: room.getId() });
		}, 0);
	}

	React.useEffect((): void => {
		enterRoom();
	});

	return (
		<div className="room-loader">
			{message ? (
				<>
					<div className="main">
						<div className="inline-message">
							{message}
						</div>
					</div>
					<div className="button-area">
						<a className="button" href=".">
							{intl.formatMessage(msg.exit)}
						</a>
					</div>
				</>
			) : (
				<div className="main">
					<div className="inline-message">
						{intl.formatMessage(msg.loading)}
					</div>
				</div>
			)}
		</div>
	);
}
