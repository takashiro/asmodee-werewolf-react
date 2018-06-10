
import React from 'react';

import GameEvent from '../../../game/GameEvent';

import SkillButtonList from './SkillButtonList';
import SkillLogList from './SkillLogList';

class NightFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			log: null,
			victims: null,
		};

		this.handleDawn = this.handleDawn.bind(this);
	}

	handleDawn() {
		let room = this.props.room;
		room.activateSkill(null);

		room.invoke(GameEvent.Night);
		room.trigger(GameEvent.Night);

		let log = <SkillLogList room={this.props.room} timing={GameEvent.Night} />;

		room.trigger(GameEvent.Dawn);
		room.trigger(GameEvent.Morning);

		let victims = room.players.filter(player => !player.isAlive() && player.deathDay == this.props.day);
		this.setState({
			log: log,
			victims: victims,
		});
	}

	render() {
		if (!this.state.log) {
			return <div className="night">
				<SkillButtonList room={this.props.room} timing={GameEvent.Night} />
				<div className="button-area">
					<button type="button" onClick={this.handleDawn}>天亮了</button>
				</div>
			</div>;
		} else {
			return <div className="night">
				{this.state.log}
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
