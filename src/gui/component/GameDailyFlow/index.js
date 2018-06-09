
import React from 'react';

import RoleIcon from '../RoleIcon';
import SkillButton from '../SkillButton';

import GameEvent from '../../../game/GameEvent';

class GameDailyFlow extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			time: GameEvent.Night
		};

		this.handleFocus = this.handleFocus.bind(this);
		this.handleDawn = this.handleDawn.bind(this);
		this.handleDusk = this.handleDusk.bind(this);
	}

	handleFocus(e) {
		let current = e.currentTarget;
		let parent = current.parentElement;
		for (let sibling of parent.children) {
			sibling.classList.remove('current');
		}
		current.classList.add('current');
	}

	handleDawn() {
		let room = this.props.room;
		room.currentSkill = null;

		if (this.props.onGameEvent) {
			this.props.onGameEvent(GameEvent.Night);
			this.props.onGameEvent(GameEvent.Dawn);
		}
		this.setState({
			time: GameEvent.Day
		});
	}

	handleDusk() {
		if (this.props.onGameEvent) {
			this.props.onGameEvent(GameEvent.Day);
			this.props.onGameEvent(GameEvent.Dusk);
		}
		this.setState({
			time: null
		});
	}

	findSkills(timing) {
		const room = this.props.room;
		const skills = room.proactiveSkills.get(timing);
		if (!skills || skills.length <= 0) {
			return null;
		}

		const available_skills = skills.filter(skill => skill.isAvailable(room));
		let actions = available_skills.map((skill, key) => (
			<li key={key} onClick={this.handleFocus}>
				<SkillButton
					room={room}
					skill={skill}
				/>
			</li>
		));
		return actions;
	}

	renderNight() {
		let actions = this.findSkills(GameEvent.Night);
		return <div className="night">
			<ol className="action">{actions}</ol>
			<button type="button" onClick={this.handleDawn}>天亮了</button>
		</div>;
	}

	renderDay() {
		const room = this.props.room;

		let messages = [];
		let victims = room.players.filter(player => !player.isAlive() && !player.deathDay);
		if (victims.length <= 0) {
			messages.push('平安夜');
		} else {
			let message = '昨晚倒牌 ' + victims.map(victim => victim.state.seat).join(', ');
			messages.push(message);
		}

		const actions = this.findSkills(GameEvent.Day);

		messages = messages.map((text, i) => <p key={i}>{text}</p>);
		return <div className="day">
			<div className="day-message">
				<h3>夜间信息</h3>
				{messages}
			</div>
			<ol className="action">{actions}</ol>
			<div className="button-area">
				<button type="button" onClick={this.handleDusk}>天黑了</button>
			</div>
		</div>;
	}

	renderLog() {
		const logs = [];
		const room = this.props.room;

		let victims = room.players.filter(player => player.deathDay == this.props.day);
		if (victims && victims.length > 0) {
			let victim_logs = victims.map(victim => {
				let reason = victim.deathReason.map(marker => marker.name);
				return reason.join(',') + ' ' + victim.state.seat;
			});
			logs.push(...victim_logs);
		} else {
			logs.push('平安夜');
		}

		return <div className="log">
			<div className="day-message">
				{logs.map((text, i) => <p key={i}>{text}</p>)}
			</div>
		</div>;
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
