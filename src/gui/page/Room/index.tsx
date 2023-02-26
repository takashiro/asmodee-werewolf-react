import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import Page from '../../../model/Page';
import RoomModel from '../../../model/Room';
import go from '../../../util/go';

import Clickable from '../../common/Clickable';

import RoleTable from './RoleTable';
import RoleViewer from './RoleViewer';
import ShareArea from './ShareArea';

import './index.scss';

const msg = defineMessages({
	roomTitle: { defaultMessage: 'Room Number: {id}' },
	exitButtonText: { defaultMessage: 'Exit' },
});

interface RoomProps {
	room: RoomModel;
}

function Room({
	room,
}: RoomProps): JSX.Element {
	const intl = useIntl();
	const roles = room.getRoles();
	const title = intl.formatMessage(msg.roomTitle, { id: room.getId() });

	function handleExit(): void {
		go(Page.Lobby);
	}

	return (
		<div className="room">
			<div className="inline-message">
				{title}
			</div>
			{roles && <RoleTable roles={roles} />}
			{!room.isOwner() && <RoleViewer player={room.createPlayer()} />}
			<ShareArea roomId={room.getId()} />
			<div className="button-area">
				{/* (this.isOwner() ? <button onClick={this.openGodNote}>上帝助手</button> : null) */}
				<Clickable onTrigger={handleExit}>
					{intl.formatMessage(msg.exitButtonText)}
				</Clickable>
			</div>
		</div>
	);
}

export default Room;
