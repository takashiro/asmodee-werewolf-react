import React from 'react';

import Page from '../Page';

import RoleTable from './RoleTable';
import RoleViewer from './RoleViewer';
import ShareLink from './ShareLink';

import RoomModel from '../../model/Room';

import './index.scss';

interface RoomProps {
	room: RoomModel;
	onPageNagivated?: (page: Page) => void;
}

function Room(props: RoomProps): JSX.Element {
	const {
		room,
		onPageNagivated,
	} = props;

	function handleReturn(e: React.MouseEvent<HTMLButtonElement>): void {
		if (onPageNagivated) {
			setTimeout(onPageNagivated, 0, Page.Lobby);
		}
	}

	const roles = room.getRoles();
	return (
		<div>
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
				<button type="button" onClick={handleReturn}>返回</button>
			</div>
		</div>
	);
}

export default Room;
