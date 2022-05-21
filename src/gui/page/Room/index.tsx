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
import Clickable from '../../common/Clickable';

const msg = defineMessages({
	roomTitle: { defaultMessage: 'Room Number: {id}' },
	linkTitle: { defaultMessage: 'Invite Link' },
	exitButtonText: { defaultMessage: 'Exit' },
});

interface RoomProps {
	room: RoomModel;
	onExit: () => void;
}

function Room(props: RoomProps): JSX.Element {
	const {
		room,
		onExit,
	} = props;

	const intl = useIntl();
	const roles = room.getRoles();
	const title = intl.formatMessage(msg.roomTitle, { id: room.getId() });

	React.useEffect(() => {
		const { origin, pathname } = window.location;
		const roomUrl = `${origin}${pathname}?id=${room.getId()}`;
		if (roomUrl === window.location.href) {
			return;
		}
		const state = {
			id: room.getId(),
		};
		window.history.pushState(state, `${title} - ${document.title}`, roomUrl);
	});

	return (
		<div className="room">
			<div className="inline-message">
				{title}
			</div>
			{roles && <RoleTable roles={roles} />}
			{!room.isOwner() && <RoleViewer player={room.createPlayer()} />}
			<div className="box share-link-area">
				<h2>
					{intl.formatMessage(msg.linkTitle)}
				</h2>
				<ShareLink id={room.getId()} />
			</div>
			<div className="button-area">
				{/* (this.isOwner() ? <button onClick={this.openGodNote}>上帝助手</button> : null) */}
				<Clickable onTrigger={onExit}>
					{intl.formatMessage(msg.exitButtonText)}
				</Clickable>
			</div>
		</div>
	);
}

export default Room;
