
import Role from '../core/Role';
import Player from '../game/Player';

import SkillPack from './pack';
import PassiveSkill from './PassiveSkill';
import ProactiveSkill from './ProactiveSkill';

class Room {

	constructor(config) {
		this.day = 1;
		this.playerNum = config.roles.length;
		this.players = [];

		for (let i = 0; i < this.playerNum; i++) {
			this.players.push(new Player(i + 1, Role.Unknown));
		}

		this.skills = {
			proactive: [],
			passive: []
		};
		for (let skills of SkillPack) {
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
	}

	findPlayer(condition) {
		return this.players.find(condition);
	}
}

export default Room;
