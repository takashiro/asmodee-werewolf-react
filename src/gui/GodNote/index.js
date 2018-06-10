
import React from 'react';
import ReactDOM from 'react-dom';

import Room from '../Room';

import Toast from '../component/Toast';
import PlayerAvatar from '../component/PlayerAvatar';
import GameDailyFlow from '../component/GameDailyFlow';

import GameRoom from '../../game/Room';

import {$client, net} from '../../net/Client';

import './index.scss';

class GodNote extends React.Component {

	constructor(props) {
		super(props);

		// Initialize state
		this.state = {
			day: 1
		};
		this.gameflows = [];

		// Bind callbacks
		this.handleReturn = this.handleReturn.bind(this);

		// Create room instance
		this.room = new GameRoom;
		this.room.on('day', day => this.setState({day: day}));
		this.room.on('loaded', () => this.forceUpdate());
	}

	componentDidMount() {
		this.load();
	}

	handleReturn(e) {
		e.preventDefault();
		ReactDOM.render(
			<Room config={this.props.config} />,
			document.getElementById('root')
		);
	}

	load() {
		// Check if it's opened by room owner
		const config = this.props.config;
		let session = config.readSession();
		if (!session || !session.ownerKey) {
			return;
		}

		if (session.roles) {
			this.room.load(session.roles);
			return;
		}

		// Send request to server
		$client.request(net.FetchRoles, {
				id: config.id,
				ownerKey: session.ownerKey
			}, result => {
				if (typeof result == 'string') {
					Toast.makeToast(result);
					return;
				}

				if (!(result instanceof Array)) {
					Toast.makeToast('房间已失效，无法刷新。');
					return;
				}

				session.roles = result;
				config.writeSession(session);

				this.room.load(result);
			}
		);
	}

	render() {
		let players = this.room.players.map(
			(player, i) =>
			<PlayerAvatar
				key={i}
				room={this.room}
				player={player}
			/>
		);

		let half = Math.ceil(players.length / 2);
		let right_round = players.slice(0, half);
		let left_round = players.slice(half);

		for (let i = this.gameflows.length; i < this.state.day; i++) {
			let day = i + 1;
			this.gameflows.push(<li key={day}>
				<GameDailyFlow
					day={day}
					room={this.room}
				/>
			</li>);
		}

		return <div className="god-note">
			<ul className="player-round left">
				{left_round}
			</ul>
			<ul className="player-round right">
				{right_round}
			</ul>
			{players.length <= 0 ? '加载中……' :  <ol className="game-flow">{this.gameflows}</ol>}
			<div className="button-area">
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default GodNote;
