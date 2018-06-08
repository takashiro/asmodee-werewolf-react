
import EventEmitter from 'events';

import Role from '../core/Role';
import SkillList from './SkillList';

class Player extends EventEmitter {

	constructor(seat) {
		super();

		this.seat = seat;
		this.role = Role.Unknown;
		this.cards = [];

		this.skills = [];

		this.alive = true;
		this.deathDay = 0;
		this.deathReason = 0;

		this.markers = new Set;
		this.tags = new Set;
	}

	setRole(role) {
		this.role = role;
		this.emit('roleChanged', role);
	}

	isAlive() {
		return this.alive;
	}

	setAlive(alive) {
		this.alive = alive;
		this.emit('aliveChanged', alive);
	}

	loadRoleSkills() {
		for (let i = 0; i < SkillList.length; i++) {
			let skills = SkillList[i];
			for (let Skill of skills) {
				let skill = new Skill;
				skill.priority = i;
				if (this.role === skill.role) {
					this.addSkill(skill);
				}
			}
		}
	}

	addSkill(skill) {
		skill.owner = this;
		this.skills.push(skill);
	}

}

export default Player;
