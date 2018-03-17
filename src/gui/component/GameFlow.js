
import React from 'react';

import GameDailyFlow from './GameDailyFlow';

class GameFlow extends React.Component {

	constructor(props) {
		super(props);
		this.room = props.room;
		this.state = {
			day: 1
		};

		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.handleSkill = this.handleSkill.bind(this);
		this.handleGameEvent = this.handleGameEvent.bind(this);
	}

	handlePhaseChange(role) {
		if (this.props.onPhaseChange) {
			this.props.onPhaseChange(role);
		}
	}

	handleSkill(skill) {
		if (this.props.onSkill) {
			this.props.onSkill(skill);
		}
	}

	handleGameEvent(event) {
		if (this.props.onGameEvent) {
			this.props.onGameEvent(event);
		}
	}

	render() {
		const room = this.props.room;

		let days = [];
		for (let i = 0; i < this.state.day; i++) {
			let day = i + 1;
			days.push(<li key={day}>
				<GameDailyFlow
					day={day}
					room={room}
					onPhaseChange={this.handlePhaseChange}
					onSkill={this.handleSkill}
					onGameEvent={this.handleGameEvent}
				/>
			</li>);
		}

		return <ol className="game-flow">{days}</ol>;
	}

}

export default GameFlow;
