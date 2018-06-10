
import EventEmitter from 'events';

import Role from './Role';
import GameEvent from './GameEvent';
import Player from './Player';
import ProactiveSkill from './ProactiveSkill';
import PassiveSkill from './PassiveSkill';
import BasicRule from './BasicRule';

class Room extends EventEmitter {

	constructor() {
		super();

		this.players = [];
		this.currentTarget = null;
		this.currentSkill = null;
		this.proactiveSkills = new Map;
		this.passiveSkills = new Map;

		this.day = 1;
		this.timing = GameEvent.Night;
	}

	load(config) {
		this.loadPlayers(config);
		this.loadSkills();
		this.trigger(GameEvent.Start, null);
		this.emit('loaded');
	}

	tickDay() {
		this.day++;
		this.emit('day', this.day);
	}

	loadPlayers(players) {
		this.players = new Array(players.length);
		for (let record of players) {
			let i = record.seat - 1;
			if (i < 0 || i >= this.players.length) {
				continue;
			}

			let player = this.players[i] = new Player(record.seat);
			let card = record.card;
			if (card) {
				if (card.cards) {
					player.cards = card.cards.map(role => Role.fromNum(role));
				}
				let role = Role.fromNum(card.role);
				player.setRole(role);
				player.loadRoleSkills(role);
			}
		}
	}

	addSkill(skill) {
		let skillSet = null;
		if (skill instanceof ProactiveSkill) {
			skillSet = this.proactiveSkills;
		} else if (skill instanceof PassiveSkill) {
			skillSet = this.passiveSkills;
		} else {
			return;
		}

		let list = null;
		if (!skillSet.has(skill.timing)) {
			list = [];
			skillSet.set(skill.timing, list);
		} else {
			list = skillSet.get(skill.timing);
		}

		if (list.indexOf(skill) === -1) {
			list.push(skill);
		}
	}

	loadSkills() {
		for (let player of this.players) {
			for (let skill of player.skills) {
				this.addSkill(skill);
			}
		}

		for (let Rule of BasicRule) {
			let rule = new Rule;
			rule.priority = 1000;
			this.addSkill(rule);
		}

		for (let skillSet of [this.proactiveSkills, this.passiveSkills]) {
			for (let [timing, skills] of skillSet) {
				skills.sort((a, b) => a.priority > b.priority);
			}
		}
	}

	useSkill(skill) {
		if (skill.targetNum <= 0) {
			if (skill.effect(this) && skill.owner) {
				skill.owner.emit('skillInvoked', skill);
			}
		} else if (skill.targetNum == 1) {
			let target = skill.findTarget(this);
			if (target) {
				if (skill.effect(this, target) && skill.owner) {
					skill.owner.emit('skillInvoked', skill);
				}
			}
		} else {
			let targets = skill.findTargets(this);
			if (targets.length === skill.targetNum) {
				if (skill.effect(this, targets) && skill.owner) {
					skill.owner.emit('skillInvoked', skill);
				}
			}
		}
	}

	invoke(event) {
		this.currentSkill = null;

		let skills = this.proactiveSkills.get(event);
		if (!skills || skills.length <= 0) {
			return;
		}

		for (let skill of skills) {
			if (!skill.delayed) {
				continue;
			}

			this.useSkill(skill);
		}
	}

	trigger(event, target) {
		let skills = this.passiveSkills.get(event);
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

	activateSkill(skill) {
		if (this.currentSkill) {
			let prev = this.currentSkill;
			if (!prev.delayed && this.currentTarget) {
				let target = this.currentTarget;
				target.removeMarker(prev.marker);
				target.emit('selected', false);
			}
		}

		if (skill && skill.clickable) {
			this.currentSkill = skill;
			if (skill.targetFixed) {
				let targets = this.players.filter(player => skill.isValidTarget(player));
				for (let target of targets) {
					skill.select(this, target);
				}
			}
		} else {
			this.currentSkill = null;
		}
	}

	selectPlayer(player) {
		if (!this.currentSkill) {
			return;
		}

		let skill = this.currentSkill;
		if (skill.delayed) {
			skill.select(this, player);
		} else {
			if (this.currentTarget === player) {
				if (skill.effect(this, player) && skill.owner) {
					this.currentSkill = null;
					skill.owner.emit('skillInvoked', skill);
				}
				this.currentTarget = null;
				player.emit('selected', false);
			} else {
				if (this.currentTarget) {
					let prev = this.currentTarget;
					prev.removeMarker(skill.marker);
					prev.emit('selected', false);
					this.currentTarget = null;
				}

				if (skill.select(this, player)) {
					this.currentTarget = player;
					player.emit('selected', true);
				}
			}
		}
	}

	killPlayer(target) {
		if (!target.isAlive()) {
			return false;
		}

		target.setAlive(false);
		this.trigger(GameEvent.Killed, target);

		if (!target.isAlive()) {
			target.deathDay = this.day;
			target.deathTiming = this.timing;
			this.trigger(GameEvent.Death, target);
			return true;
		}

		return false;
	}

}

export default Room;
