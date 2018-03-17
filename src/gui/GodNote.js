
import React from 'react';
import ReactDOM from 'react-dom';

import Room from './Room';

import Role from '../core/Role';

import Toast from './component/Toast';
import PlayerIcon from './component/PlayerIcon';
import GameFlow from './component/GameFlow';

import SkillList from '../game/SkillList';
import PassiveSkill from '../game/PassiveSkill';
import ProactiveSkill from '../game/ProactiveSkill';

import $client from '../net/Client';
const net = $client.API;

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

		// Read Configuration
		const config = props.config;

		// Initialize state
		this.state = {
			day: 1
		};

		// Add all players
		this.playerNum = config.roles.length;
		this.players = [];
		for (let i = 0; i < this.playerNum; i++) {
			this.players.push(<PlayerIcon
				key={i}
				seat={i + 1}
				role={Role.Unknown}
				onClick={this.handlePlayerClick}
			/>);
		}

		// Load skills
		this.skills = {
			proactive: [],
			passive: []
		};
		for (let skills of SkillList) {
			for (let Skill of skills) {
				let skill = new Skill;
				if (config.roles.indexOf(skill.role) >= 0) {
					if (skill instanceof ProactiveSkill) {
						this.skills.proactive.push(skill);
					} else if (skill instanceof PassiveSkill) {
						this.skills.passive.push(skill);
					}
				}
			}
		}

		this.refreshRoles();
	}

	findPlayer(condition) {
		return this.state.players.find(condition);
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
		this.action = useSkill;
	}

	handlePlayerClick(player) {
		if (this.action) {
			this.action.call(this, player);
		}
	}

	refreshRoles() {
		/*// Check if it's opened by room owner
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
				if (i >= 0 && i < players.length) {
					let player = players[i];
					if (record.card) {
						let card = record.card;
						if (card.role) {
							player.role = Role.fromNum(card.role);
						}
						if (card.cards) {
							player.cards = card.cards.map(role => Role.fromNum(role));
						}
					}
				}
			}
		});*/
	}

	render() {
		let players = this.players;
		let half = Math.ceil(players.length / 2);
		let right_round = players.slice(0, half);
		let left_round = players.slice(half);

		return <div className="god-note">
			<style>@import url(style/god-note.css);</style>
			<ul className="player-round left">
				{left_round}
			</ul>
			<ul className="player-round right">
				{right_round}
			</ul>
			<GameFlow
				room={this}
				onPhaseChange={this.handlePhaseChange}
				onSkill={this.handleSkill}
			/>
			<div className="button-area">
				<button onClick={this.handleReturn}>返回</button>
			</div>
		</div>;
	}

}

export default GodNote;
