
import React from 'react';
import ReactDOM from 'react-dom';

import Room from './Room';

import Role from '../core/Role';

import Toast from './component/Toast';
import PlayerIcon from './component/PlayerIcon';
import GameFlow from './component/GameFlow';

import GameRoom from '../game/Room';

import $client from '../net/Client';
const net = $client.API;

class GodNote extends React.Component {

	constructor(props) {
		super(props);
		this.handleReturn = this.handleReturn.bind(this);
		this.room = new GameRoom(props.config);
		this.refreshRoles();
	}

	handleReturn(e) {
		e.preventDefault();
		ReactDOM.render(
			<Room config={this.props.config} />,
			document.getElementById('root')
		);
	}

	refreshRoles() {
		// Check if it's opened by room owner
		const config = this.props.config;
		let session = config.readSession();
		if (!session || !session.ownerKey) {
			return;
		}

		// Clear current state
		const room = this.room;
		const players = room.players;
		for (let player of players) {
			player.role = Role.Unknown;
			player.tags.clear();
			player.markers.clear();
		}

		// Send request to server
		$client.request(net.FetchRoles, {id: config.id, ownerKey: session.ownerKey}, result => {
			if (typeof result == 'string') {
				Toast.makeToast(result);
				return;
			}

			if (!(result instanceof Array)) {
				Toast.makeToast('房间已失效，无法刷新。');
				return;
			}

			for (let record of result) {
				let i = record.seat - 1;
				if (i >= 0 && i < players.length) {
					let player = players[i];
					if (record.card) {
						let card = record.card;
						if (card.role) {
							player.role = Role.fromNum(card.role);
						}
						if (card.cards) {
							player.cards = card.cards.map(role => Role.fromNum(role));
						}
					}
				}
			}
		});
	}

	render() {
		let players = this.room.players;
		let half = Math.ceil(players.length / 2);
		let right_round = players.slice(0, half).map(player => <PlayerIcon key={player.seat} player={player} />);
		let left_round = players.slice(half).map(player => <PlayerIcon key={player.seat} player={player} />);

		return <div className="god-note">
			<style>@import url(style/god-note.css);</style>
			<ul className="player-round left">
				{left_round}
			</ul>
			<ul className="player-round right">
				{right_round}
			</ul>
			<GameFlow room={this.room} />
			<div className="button-area">
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default GodNote;
