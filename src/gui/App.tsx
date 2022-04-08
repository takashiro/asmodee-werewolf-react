import React from 'react';

import RoomModel from '../model/Room';
import Page from '../model/Page';

import Lobby from './page/Lobby';
import RoomCreator from './page/RoomCreator';
import RoomLoader from './page/RoomLoader';
import Room from './page/Room';

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let room: RoomModel | undefined;

export default function App(): JSX.Element {
	const [page, setPage] = React.useState<Page>(!id ? Page.Lobby : Page.Loading);

	function handlePageOpen(newPage: Page, newRoom?: RoomModel): void {
		room = newRoom;
		setPage(newPage);
	}

	if (page === Page.Lobby) {
		return <Lobby onPageOpen={handlePageOpen} />;
	}
	if (page === Page.RoomCreator) {
		return <RoomCreator onPageOpen={handlePageOpen} />;
	}
	if (page === Page.Room) {
		if (room) {
			return (
				<Room room={room} />
			);
		}
	}
	if (page === Page.Loading && id) {
		return (
			<RoomLoader
				id={Number.parseInt(id, 10)}
				onPageOpen={handlePageOpen}
			/>
		);
	}
	return <div>Page Not Found</div>;
}