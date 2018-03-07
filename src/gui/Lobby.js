import React from 'react';
import ReactDOM from 'react-dom';

function createRoom() {
}

function enterRoom() {
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
