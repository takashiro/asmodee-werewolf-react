import React from 'react';

import Page from './Page';
import Lobby from './Lobby';
import RoomCreator from './RoomCreator';
import Room from './Room';

import GameRoom from '../model/Room';

import './global.scss';

interface AppState {
	page: Page;
}

export default class App extends React.Component<{}, AppState> {
	room?: GameRoom;

	constructor(props: {}) {
		super(props);

		this.state = {
			page: Page.Lobby,
		};
	}

	handlePageNavigation = (newPage: Page, room?: GameRoom): void => {
		this.room = room;
		this.setState({ page: newPage });
	}

	render(): JSX.Element {
		const { page } = this.state;
		if (page === Page.Lobby) {
			return <Lobby onPageNagivated={this.handlePageNavigation} />;
		}
		if (page === Page.RoomCreator) {
			return <RoomCreator onPageNavigated={this.handlePageNavigation} />;
		}
		if (page === Page.Room) {
			const { room } = this;
			if (room) {
				return <Room room={room} onPageNagivated={this.handlePageNavigation} />;
			}
		}
		return <div>incorrect page nagivation</div>;
	}
}
