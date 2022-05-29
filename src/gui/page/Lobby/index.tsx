import React from 'react';
import {
	useIntl,
	defineMessages,
	FormattedMessage,
	IntlShape,
} from 'react-intl';

import { makeToast } from '../../common/Toast';

import Page from '../../../model/Page';
import Room from '../../../model/Room';
import { client } from '../../../model/Client';
import HttpError from '../../../model/HttpError';
import go from '../../../util/go';

import './index.scss';

const desc = defineMessages({
	emptyRoomNumber: { defaultMessage: 'Please input a room number.' },
	roomNotExist: { defaultMessage: 'The room does not exist.' },
	unknownError: { defaultMessage: 'Unknown error.' },
	roomNumber: { defaultMessage: 'Room Number' },
});

async function fetchRoom(intl: IntlShape): Promise<Room | undefined> {
	const roomInput = document.getElementById('room-number') as HTMLInputElement;
	const roomId = Number.parseInt(roomInput.value, 10);
	if (Number.isNaN(roomId)) {
		makeToast(intl.formatMessage(desc.emptyRoomNumber));
		roomInput.value = '';
		roomInput.focus();
		return;
	}

	const room = new Room(client);
	if (!room.restore(roomId)) {
		try {
			await room.enter(roomId);
		} catch (error) {
			if (error instanceof HttpError && error.code === 404) {
				makeToast(intl.formatMessage(desc.roomNotExist));
			} else {
				makeToast(intl.formatMessage(desc.unknownError));
			}
			return;
		}
		room.save();
	}
	return room;
}

export default function Lobby(): JSX.Element {
	const intl = useIntl();

	function createRoom(): void {
		go(Page.RoomCreator);
	}

	async function enterRoom(): Promise<void> {
		const room = await fetchRoom(intl);
		if (!room) {
			return;
		}

		go(Page.Room, { id: room.getId() });
	}

	return (
		<div className="lobby">
			<div className="simple-form">
				<button type="button" onClick={createRoom}>
					<FormattedMessage defaultMessage="Start a New Game" />
				</button>
			</div>
			<div className="simple-form">
				<input
					id="room-number"
					type="number"
					inputMode="decimal"
					placeholder={intl.formatMessage(desc.roomNumber)}
				/>
				<button type="button" onClick={enterRoom}>
					<FormattedMessage defaultMessage="Join a Game" />
				</button>
			</div>
		</div>
	);
}
