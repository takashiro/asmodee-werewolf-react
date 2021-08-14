import React from 'react';

import Toast from '../component/Toast';
import Page from '../Page';

import Room from '../../model/Room';
import { client } from '../../model/Client';

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

	const res = await client.get(`room/${roomId}`);
	if (res.status === 200) {
		const config = await res.json();
		const room = new Room(config);
		room.save();
		return room;
	}

	if (res.status === 404) {
		Toast.makeToast('房间不存在。');
	} else {
		Toast.makeToast('未知错误。');
	}
	roomInput.value = '';
	roomInput.focus();
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
					<input id="room-number" type="number" placeholder="房间号" />
					<button type="button" onClick={this.enterRoom}>加入房间</button>
				</div>
			</div>
		);
	}
}
