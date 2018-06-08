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

function parseQueryString() {
	let query_offset = location.href.indexOf('?');
	if (query_offset <= 0) {
		return {};
	}

	let query_string = location.href.substr(query_offset + 1);
	if (query_string.length <= 0) {
		return {};
	}

	let values = {};
	let params = query_string.split('&');
	for (let param of params) {
		if (param.length <= 0) {
			continue;
		}

		let equal = param.indexOf('=');
		if (equal >= 0) {
			let key = param.substr(0, equal);
			let value = param.substr(equal + 1);
			values[key] = value;
		} else {
			values[param] = null;
		}
	}

	return values;
}

class Lobby extends React.Component {

	constructor(props) {
		super(props);
	}

	componentDidMount() {
		if (!this.props.autoEnter) {
			return;
		}

		let param = parseQueryString();
		if (param.room_id) {
			document.getElementById('room-number').value = param.room_id;
			enterRoom();
		}
	}

	render() {
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
}

export default Lobby;
