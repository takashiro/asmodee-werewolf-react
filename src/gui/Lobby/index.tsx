import React from 'react';

import Toast from '../component/Toast';
import Page from '../Page';

import Room from '../../model/Room';
import Client from '../../model/Client';

import './index.scss';

async function fetchRoom(): Promise<Room | undefined> {
	const roomInput = document.getElementById('room-number') as HTMLInputElement;
	const roomId = Number.parseInt(roomInput.value, 10);
	if (Number.isNaN(roomId)) {
		Toast.makeToast('请输入一个数字。');
		roomInput.value = '';
		roomInput.focus();
		return;
	}

	const client = new Client('api');
	const room = new Room(client);
	if (!room.restore(roomId)) {
		try {
			await room.enter(roomId);
		} catch (error) {
			if (error.code === 404) {
				Toast.makeToast('房间不存在。');
			} else {
				Toast.makeToast('未知错误。');
			}
			return;
		}
		room.save();
	}
	return room;
}

interface LobbyProps {
	onPageNagivated?: (page: Page) => void;
}

export default class Lobby extends React.Component<LobbyProps> {
	createRoom = (): void => {
		const { onPageNagivated } = this.props;
		if (onPageNagivated) {
			setTimeout(onPageNagivated, 0, Page.RoomCreator);
		}
	}

	enterRoom = async (): Promise<void> => {
		const room = await fetchRoom();
		if (!room) {
			return;
		}

		const { onPageNagivated } = this.props;
		if (onPageNagivated) {
			setTimeout(onPageNagivated, 0, Page.Room, room);
		}
	}

	render(): JSX.Element {
		return (
			<div className="lobby">
				<div className="simple-form lobby">
					<button type="button" onClick={this.createRoom}>创建房间</button>
				</div>
				<div className="simple-form lobby">
					<input
						id="room-number"
						type="number"
						inputMode="decimal"
						placeholder="房间号"
					/>
					<button type="button" onClick={this.enterRoom}>加入房间</button>
				</div>
			</div>
		);
	}
}
