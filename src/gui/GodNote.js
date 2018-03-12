
import React from 'react';
import ReactDOM from 'react-dom';

import Room from './Room';

import PlayerIcon from './component/PlayerIcon';
import GameFlow from './component/GameFlow';

import GameRoom from '../game/Room';

class GodNote extends React.Component {

	constructor(props) {
		super(props);
		this.handleReturn = this.handleReturn.bind(this);
		this.room = new GameRoom(props.config);
	}

	handleReturn(e) {
		e.preventDefault();
		ReactDOM.render(
			<Room config={this.props.config} />,
			document.getElementById('root')
		);
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
			<GameFlow />
			<div className="button-area">
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default GodNote;
