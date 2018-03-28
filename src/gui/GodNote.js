
import React from 'react';
import ReactDOM from 'react-dom';

import Room from './Room';

import Role from '../core/Role';

import Toast from './component/Toast';
import PlayerIcon from './component/PlayerIcon';
import GameDailyFlow from './component/GameDailyFlow';

import BasicRule from '../game/BasicRule';
import SkillList from '../game/SkillList';
import PassiveSkill from '../game/PassiveSkill';
import ProactiveSkill from '../game/ProactiveSkill';

import {$client, net} from '../net/Client';
import GameEvent from '../game/GameEvent';

function markRole(target) {
	if (!this.currentPhase || this.currentPhase == Role.Unknown) {
		return;
	}

	target.setState(prev => ({
		role: prev.role === this.currentPhase ? Role.Unknown : this.currentPhase
	}));
}

function useSkill(target) {
	if (!this.currentSkill) {
		return;
	}

	this.currentSkill.effect(this, target);
}

class GodNote extends React.Component {

	constructor(props) {
		super(props);

		this.action = null;
		this.currentSkill = null;
		this.currentPhase = null;

		this.handleReturn = this.handleReturn.bind(this);
		this.handlePhaseChange = this.handlePhaseChange.bind(this);
		this.handleSkill = this.handleSkill.bind(this);
		this.handlePlayerClick = this.handlePlayerClick.bind(this);
		this.trigger = this.trigger.bind(this);

		// Read Configuration
		const config = props.config;

		// Initialize state
		this.state = {
			day: 1
		};
		this.day = 1;
		this.playerNum = config.roles.length;

		// Load skills
		this.skills = this.loadSkills();

		this.trigger(GameEvent.Start, null);

		// Add all players
		this.players = new Array(this.playerNum);
		this.playerIcons = new Array(this.playerNum);
		for (let i = 0; i < this.playerNum; i++) {
			this.playerIcons[i] = <PlayerIcon
				key={i}
				seat={i + 1}
				role={Role.Unknown}
				skills={this.skills.proactive}
				onClick={this.handlePlayerClick}
				onSkill={this.handleSkill}
				ref={p => {this.players[i] = p;}}
			/>;
		}
	}

	componentDidMount() {
		this.refreshRoles();
	}

	loadSkills() {
		let proactive = new Map;
		let passive = new Map;

		function add(skill) {
			let result = null;
			if (skill instanceof ProactiveSkill) {
				result = proactive;
			} else if (skill instanceof PassiveSkill) {
				result = passive;
			} else {
				return;
			}

			let list = null;
			if (!result.has(skill.timing)) {
				list = [];
				result.set(skill.timing, list);
			} else {
				list = result.get(skill.timing);
			}
			list.push(skill);
		}

		for (let skills of SkillList) {
			for (let Skill of skills) {
				let skill = new Skill;
				if (this.props.config.roles.indexOf(skill.role) >= 0) {
					add(skill);
				}
			}
		}

		for (let Rule of BasicRule) {
			add(new Rule);
		}

		return {
			proactive,
			passive,
		};
	}

	tickDay() {
		this.day++;
		this.setState({
			day: this.day
		});
	}

	handleReturn(e) {
		e.preventDefault();
		ReactDOM.render(
			<Room config={this.props.config} />,
			document.getElementById('root')
		);
	}

	handlePhaseChange(role) {
		this.currentPhase = role;
		this.action = markRole;
	}

	handleSkill(skill) {
		this.currentSkill = skill;
		if (skill.targetFixed) {
			this.action = null;
			skill.effect(this);
		} else {
			this.action = useSkill;
		}
	}

	handlePlayerClick(player) {
		if (this.action) {
			this.action.call(this, player);
		}
	}

	trigger(event, target) {
		let skills = this.skills.passive.get(event);
		if (!skills || skills.length <= 0) {
			return;
		}

		for (let skill of skills) {
			if (target === undefined) {
				if (skill.triggerable(this)) {
					skill.effect(this);
				}

				for (let player of this.players) {
					if (skill.triggerable(this, player)) {
						skill.effect(this, player);
					}
				}
			} else {
				if (skill.triggerable(this, target)) {
					skill.effect(this, target);
				}
			}
		}
	}

	refreshRoles() {
		// Check if it's opened by room owner
		const config = this.props.config;
		let session = config.readSession();
		if (!session || !session.ownerKey) {
			return;
		}

		// Clear current state
		const players = this.players;
		for (let player of players) {
			player.setState(prev => {
				prev.tags.clear();
				prev.markers.clear();
				return {
					role: Role.Unknown,
					tags: prev.tags,
					markers: prev.markers,
				};
			});
		}

		// Send request to server
		$client.request(net.FetchRoles, {id: config.id, ownerKey: session.ownerKey}, result => {
			if (typeof result == 'string') {
				Toast.makeToast(result);
				return;
			}

			if (!(result instanceof Array)) {
				Toast.makeToast('房间已失效，无法刷新。');
				return;
			}

			for (let record of result) {
				let i = record.seat - 1;
				if (i >= 0 && i < this.players.length) {
					let player = this.players[i];
					if (record.card) {
						let card = record.card;
						let state = {};
						if (card.role) {
							state.role = Role.fromNum(card.role);
						}
						if (card.cards) {
							state.cards = card.cards.map(role => Role.fromNum(role));
						}
						player.setState(state);
					}
				}
			}
		});
	}

	render() {
		let players = this.playerIcons;
		let half = Math.ceil(players.length / 2);
		let right_round = players.slice(0, half);
		let left_round = players.slice(half);

		let gameflow = [];
		for (let i = 0; i < this.state.day; i++) {
			let day = i + 1;
			gameflow.push(<li key={day}>
				<GameDailyFlow
					day={day}
					room={this}
					onPhaseChange={this.handlePhaseChange}
					onSkill={this.handleSkill}
					onGameEvent={this.trigger}
				/>
			</li>);
		}

		return <div className="god-note">
			<style>@import url(style/god-note.css);</style>
			<ul className="player-round left">
				{left_round}
			</ul>
			<ul className="player-round right">
				{right_round}
			</ul>
			<ol className="game-flow">{gameflow}</ol>
			<div className="button-area">
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default GodNote;
