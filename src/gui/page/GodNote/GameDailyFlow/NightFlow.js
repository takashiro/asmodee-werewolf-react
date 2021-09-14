
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import Logger from './Logger';

class NightFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			history: null,
			victims: null,
		};

		this.handleDawn = this.handleDawn.bind(this);
	}

	handleDawn() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Night);
		room.trigger(GameEvent.Night);

		let logger = new Logger(this.props.room, this.props.day, GameEvent.Night);
		let history = logger.history;

		room.trigger(GameEvent.Dawn);
		room.trigger(GameEvent.Morning);

		this.setState({
			history: history,
			victims: logger.victims,
		});
	}

	render() {
		if (!this.state.history) {
			return <div className="night">
				<SkillButtonList room={this.props.room} timing={GameEvent.Night} />
				<div className="button-area">
					<button type="button" onClick={this.handleDawn}>天亮了</button>
				</div>
			</div>;
		} else {
			return <div className="night">
				<ol className="history">
					{this.state.history.map((text, i) => <li key={i}>{text}</li>)}
				</ol>
				<div className="dying-message">
				{this.state.victims && this.state.victims.length > 0
					? '昨晚倒牌 ' + this.state.victims.map(victim => victim.seat).join(', ')
					: '昨晚平安夜'}
				</div>
			</div>;
		}
	}

}

export default NightFlow;
