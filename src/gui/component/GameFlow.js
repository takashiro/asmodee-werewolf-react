
import React from 'react';

import GameDailyFlow from './GameDailyFlow';

class GameFlow extends React.Component {

	constructor(props) {
		super(props);
		this.room = props.room;
		this.state = {
			day: 1
		};
		this.handleDusk = this.handleDusk.bind(this);
	}

	handleDusk() {
		this.setState(prev => ({
			day: prev.day + 1
		}));
		this.room.day++;
	}

	render() {
		const room = this.props.room;

		let days = [];
		for (let i = 0; i < this.state.day; i++) {
			let day = i + 1;
			days.push(<li key={day}>
				<GameDailyFlow day={day} room={room} onDusk={this.handleDusk} />
			</li>);
		}

		return <ol className="game-flow">{days}</ol>;
	}

}

export default GameFlow;
