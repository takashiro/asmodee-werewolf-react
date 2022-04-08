import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import RoleTable from './RoleTable';
import RoleViewer from './RoleViewer';
import ShareLink from './ShareLink';

import RoomModel from '../../../model/Room';

import './index.scss';

const msg = defineMessages({
	roomTitle: { defaultMessage: 'Room Number: {id}' },
	linkTitle: { defaultMessage: 'Invite Link' },
	exitButtonText: { defaultMessage: 'Exit' },
});

interface RoomProps {
	room: RoomModel;
}

function Room(props: RoomProps): JSX.Element {
	const {
		room,
	} = props;

	const intl = useIntl();
	const roles = room.getRoles();
	return (
		<div className="room">
			<div className="inline-message">
				{intl.formatMessage(msg.roomTitle, { id: room.getId() })}
			</div>
			{roles && <RoleTable roles={roles} />}
			{!room.isOwner() && <RoleViewer player={room.createPlayer()} />}
			<div className="box share-link-area">
				<span className="label">
					{intl.formatMessage(msg.linkTitle)}
				</span>
				<ShareLink id={room.getId()} />
			</div>
			<div className="button-area">
				{/* (this.isOwner() ? <button onClick={this.openGodNote}>上帝助手</button> : null) */}
				<a className="button" href=".">
					{intl.formatMessage(msg.exitButtonText)}
				</a>
			</div>
		</div>
	);
}

export default Room;