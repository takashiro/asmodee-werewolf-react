import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import RoomModel from '../model/Room';
import Page from '../model/Page';

import Lobby from './page/Lobby';
import RoomCreator from './page/RoomCreator';
import RoomLoader from './page/RoomLoader';
import Room from './page/Room';

const desc = defineMessages({
	title: { defaultMessage: 'Game Assistant for Werewolves of Miller\'s Hollow' },
});

const params = new URLSearchParams(window.location.search);
const id = params.get('id');
let room: RoomModel | undefined;

export default function App(): JSX.Element {
	const intl = useIntl();
	const [page, setPage] = React.useState<Page>(!id ? Page.Lobby : Page.Loading);

	const handlePageOpen = React.useCallback((newPage: Page, newRoom?: RoomModel): void => {
		room = newRoom;
		setPage(newPage);
	}, []);

	const handleRoomExit = React.useCallback((): void => {
		setPage(Page.Lobby);
	}, []);

	React.useEffect(() => {
		const title = intl.formatMessage(desc.title);
		document.title = title;
		const header = document.body.querySelector('header');
		const h1 = header?.firstElementChild;
		const img = h1?.firstElementChild;
		img?.setAttribute('alt', title);
	});

	if (page === Page.Lobby) {
		return <Lobby onPageOpen={handlePageOpen} />;
	}
	if (page === Page.RoomCreator) {
		return <RoomCreator onPageOpen={handlePageOpen} />;
	}
	if (page === Page.Room) {
		if (room) {
			return (
				<Room room={room} onExit={handleRoomExit} />
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
