import React from 'react';
import ReactDOM from 'react-dom';

import RoomCreator from '../RoomCreator';
import Room from '../Room';
import Toast from '../component/Toast';

import RoomConfig from '../../net/RoomConfig';
import {$client, net} from '../../net/Client';

import './index.scss';

function createRoom() {
	ReactDOM.render(
		<RoomCreator />,
		document.getElementById('root')
	);
}

function enterRoom() {
	let enter_input = document.getElementById('room-number');
	let room_id = parseInt(enter_input.value, 10);
	if (isNaN(room_id)) {
		Toast.makeToast('请输入一个数字。');
		enter_input.value = '';
		enter_input.focus();
		return;
	}

	$client.request(net.EnterRoom, {id: room_id}, state => {
		if (state.id <= 0) {
			Toast.makeToast('房间不存在。');
			enter_input.value = '';
			enter_input.focus();
			return;
		}

		let config = new RoomConfig(state);
		ReactDOM.render(
			<Room config={config} />,
			document.getElementById('root')
		);
	});
}

export default function Lobby() {
	return <div className="lobby">
		<div className="simple-form lobby">
			<button type="button" onClick={createRoom}>创建房间</button>
		</div>
		<div className="simple-form lobby">
			<input id="room-number" type="number" placeholder="房间号" />
			<button type="button" onClick={enterRoom}>加入房间</button>
		</div>
	</div>;
}
