
import React from 'react';

import RoleIcon from './RoleIcon';
import SkillButton from './SkillButton';

import GameEvent from '../../game/GameEvent';

class GameDailyFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			time: GameEvent.Night
		};
	}

	renderNight() {
		const room = this.props.room;
		const skills = room.skills.proactive.filter(skill => skill.timing == GameEvent.Night);
		let actions = skills.map((skill, key) => <li key={key}><SkillButton skill={skill} /></li>);
		return <ol className="action">{actions}</ol>;
	}

	renderDay() {
	}

	renderLog() {

	}

	renderToday() {
		if (this.state.time == GameEvent.Night) {
			return this.renderNight();
		} else if (this.state.time == GameEvent.Day) {
			return this.renderDay();
		} else {
			return this.renderLog();
		}
	}

	render() {
		return <div>
			<h4>第 {this.props.day} 天</h4>
			{this.renderToday()}
		</div>;
	}

}

export default GameDailyFlow;
