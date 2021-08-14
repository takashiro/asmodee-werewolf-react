import React from 'react';

import Page from './Page';
import Lobby from './Lobby';
import RoomCreator from './RoomCreator';
import Room from './Room';

import GameRoom from '../model/Room';

import './global.scss';

interface AppState {
	currentPage: Page;
	room?: GameRoom;
}

export default class App extends React.Component<{}, AppState> {
	constructor(props: {}) {
		super(props);

		this.state = {
			currentPage: Page.Lobby,
		};
	}

	handlePageNavigation = (newPage: Page, room?: GameRoom): void => {
		this.setState({
			currentPage: newPage,
			room,
		});
	}

	render(): JSX.Element {
		const { currentPage } = this.state;
		if (currentPage === Page.Lobby) {
			return <Lobby onPageNagivated={this.handlePageNavigation} />;
		}
		if (currentPage === Page.RoomCreator) {
			return <RoomCreator onPageNavigated={this.handlePageNavigation} />;
		}
		if (currentPage === Page.Room) {
			const { room } = this.state;
			if (room) {
				return <Room room={room} onPageNagivated={this.handlePageNavigation} />;
			}
		}
		return <div>incorrect page nagivation</div>;
	}
}
