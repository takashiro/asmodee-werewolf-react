
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import Logger from './Logger';

class DayFlow extends React.Component {

	constructor(props) {
		super(props);

		let room = props.room;

		this.state = {
			history: null,
			victims: null,
			invisible: room.timing === GameEvent.Day,
		};

		room.once('morning', () => this.setState({invisible: true}));

		this.handleDusk = this.handleDusk.bind(this);
	}

	handleDusk() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Day);
		room.trigger(GameEvent.Day);

		let logger = new Logger(this.props.room, this.props.day, GameEvent.Day);
		let history = logger.history;

		room.trigger(GameEvent.Dusk);
		room.trigger(GameEvent.Evening);

		this.setState({
			history: history,
			victims: logger.victims,
		});
	}

	render() {
		if (!this.state.invisible) {
			return null;
		}

		if (!this.state.history) {
			return <div className="day">
				<SkillButtonList room={this.props.room} timing={GameEvent.Day} />
				<div className="button-area">
					<button type="button" onClick={this.handleDusk}>天黑了</button>
				</div>
			</div>;
		} else {
			return <div className="day">
				<ol className="history">
					{this.state.history.map((text, i) => <li key={i}>{text}</li>)}
				</ol>
				<div className="dying-message">
				{this.state.victims && this.state.victims.length > 0
					? '白天倒牌 ' + this.state.victims.map(victim => victim.seat).join(', ')
					: null}
				</div>
			</div>;
		}
	}

}

export default DayFlow;
