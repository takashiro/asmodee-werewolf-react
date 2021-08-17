import React from 'react';

import RoleTable from './RoleTable';
import RoleViewer from './RoleViewer';
import ShareLink from './ShareLink';

import RoomModel from '../../model/Room';

import './index.scss';

interface RoomProps {
	room: RoomModel;
}

function Room(props: RoomProps): JSX.Element {
	const {
		room,
	} = props;

	const roles = room.getRoles();
	return (
		<div className="room">
			<div className="inline-message">
				房间号：
				{room.getId()}
			</div>
			{roles && <RoleTable roles={roles} />}
			{!room.isOwner() && <RoleViewer player={room.createPlayer()} />}
			<div className="box share-link-area">
				<span className="label">邀请链接</span>
				<ShareLink id={room.getId()} />
			</div>
			<div className="button-area">
				{/* (this.isOwner() ? <button onClick={this.openGodNote}>上帝助手</button> : null) */}
				<a className="button" href=".">返回</a>
			</div>
		</div>
	);
}

export default Room;
