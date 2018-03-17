
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

		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.handleSkill = this.handleSkill.bind(this);
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

	renderNight() {
		const room = this.props.room;
		const skills = room.skills.proactive.filter(skill => skill.timing == GameEvent.Night);
		let actions = skills.map((skill, key) => <li key={key}>
			<SkillButton
				skill={skill}
				onPhaseChange={this.handlePhaseChange}
				onClick={this.handleSkill}
			/>
		</li>);
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
