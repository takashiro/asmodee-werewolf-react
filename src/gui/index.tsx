import React from 'react';

import RoomModel from '../model/Room';

import Page from './Page';
import Lobby from './page/Lobby';
import RoomCreator from './page/RoomCreator';
import RoomLoader from './page/RoomLoader';
import Room from './page/Room';

import './global.scss';

interface AppState {
	page: Page;
}

const params = new URLSearchParams(window.location.search);
const id = params.get('id');

export default class App extends React.Component<unknown, AppState> {
	room?: RoomModel;

	constructor(props: unknown) {
		super(props);

		this.state = {
			page: !id ? Page.Lobby : Page.Loading,
		};
	}

	handlePageOpen = (newPage: Page, room?: RoomModel): void => {
		this.room = room;
		this.setState({ page: newPage });
	}

	render(): JSX.Element {
		const { page } = this.state;
		if (page === Page.Lobby) {
			return <Lobby onPageOpen={this.handlePageOpen} />;
		}
		if (page === Page.RoomCreator) {
			return <RoomCreator onPageOpen={this.handlePageOpen} />;
		}
		if (page === Page.Room) {
			const { room } = this;
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
					onPageOpen={this.handlePageOpen}
				/>
			);
		}
		return <div>Page Not Found</div>;
	}
}
