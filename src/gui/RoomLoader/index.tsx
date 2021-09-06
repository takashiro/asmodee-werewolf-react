import React from 'react';
import { defineMessages, useIntl } from 'react-intl';

import Client from '../../model/Client';
import HttpError from '../../model/HttpError';
import Room from '../../model/Room';

import Page from '../Page';

import './index.scss';

const msg = defineMessages({
	roomNotExist: { defaultMessage: 'The room does not exist.' },
	unknownError: { defaultMessage: 'Unknown error.' },
	exit: { defaultMessage: 'Exit' },
	loading: { defaultMessage: 'Loading...' },
});

interface LoaderProps {
	id: number;
	onPageOpen?: (page: Page, room: Room) => void;
}

export default function RoomLoader(props: LoaderProps): JSX.Element {
	const intl = useIntl();
	const {
		id,
		onPageOpen,
	} = props;

	const [message, setMessage] = React.useState('');

	async function enterRoom(): Promise<void> {
		const client = new Client();
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

		if (onPageOpen) {
			onPageOpen(Page.Room, room);
		}
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
