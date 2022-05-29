import React from 'react';

import { client } from '../../model/Client';
import RoomModel from '../../model/Room';
import Page from '../../model/Page';

import Lobby from '../page/Lobby';
import RoomCreator from '../page/RoomCreator';
import RoomLoader from '../page/RoomLoader';
import Room from '../page/Room';

const params = new URLSearchParams(window.location.search);
const id = Number.parseInt(params.get('id') || '', 10);

export default function PageSwitch(): JSX.Element {
	const [page, setPage] = React.useState<Page>(Number.isNaN(id) ? Page.Lobby : Page.Loading);
	const [roomId, setRoomId] = React.useState(id);

	React.useEffect(() => {
		function loadPage(e: PopStateEvent): void {
			const { page, id } = e.state;
			setPage(page);
			setRoomId(id);
		}

		window.addEventListener('popstate', loadPage);
		return () => window.removeEventListener('popstate', loadPage);
	});

	if (page === Page.Lobby) {
		return <Lobby />;
	}
	if (page === Page.RoomCreator) {
		return <RoomCreator />;
	}
	if (page === Page.Room && Number.isInteger(roomId)) {
		const room = new RoomModel(client);
		if (room.restore(roomId)) {
			return <Room room={room} />;
		}
	}
	if (page === Page.Loading && roomId) {
		return <RoomLoader id={roomId} />;
	}
	return <div>Page Not Found</div>;
}
