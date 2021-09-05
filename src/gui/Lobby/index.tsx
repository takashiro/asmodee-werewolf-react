import React from 'react';
import {
	useIntl,
	defineMessages,
	FormattedMessage,
	IntlShape,
} from 'react-intl';

import { makeToast } from '../component/Toast';
import Page from '../Page';

import Room from '../../model/Room';
import Client from '../../model/Client';
import HttpError from '../../model/HttpError';

import './index.scss';

const desc = defineMessages({
	emptyRoomNumber: { defaultMessage: 'Please input a room number.' } ,
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

	const client = new Client();
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

interface LobbyProps {
	onPageOpen?: (page: Page) => void;
}

export default function Lobby({
	onPageOpen,
}: LobbyProps): JSX.Element {
	const intl = useIntl();

	function createRoom(): void {
		if (onPageOpen) {
			setTimeout(onPageOpen, 0, Page.RoomCreator);
		}
	}

	async function enterRoom(): Promise<void> {
		const room = await fetchRoom(intl);
		if (!room) {
			return;
		}

		if (onPageOpen) {
			setTimeout(onPageOpen, 0, Page.Room, room);
		}
	}

	return (
		<div className="lobby">
			<div className="simple-form">
				<button type="button" onClick={createRoom}>
					<FormattedMessage defaultMessage="Create a New Room" />
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
					<FormattedMessage defaultMessage="Enter the Room" />
				</button>
			</div>
		</div>
	);
}
