
import EventEmitter from 'events';

import Role from './Role';
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
				let skill = null;
				if (Skill.singleton) {
					skill = Skill.singleton;
				} else {
					skill = new Skill;
					skill.owner = this;
				}

				if (skill.belongsTo(this)) {
					skill.priority = i;
					this.addSkill(skill);
				}
			}
		}
	}

	addSkill(skill) {
		this.skills.push(skill);
	}

	addMarker(marker) {
		if (!this.markers.has(marker)) {
			this.markers.add(marker);
			this.emit('markerChanged', this.markers);
		}
	}

	hasMarker(marker) {
		return this.markers.has(marker);
	}

	removeMarker(marker) {
		if (this.markers.delete(marker)) {
			this.emit('markerChanged', this.markers);
		}
	}

	clearMarkers() {
		if (this.markers.size > 0) {
			this.markers.clear();
			this.emit('markerChanged', this.markers);
		}
	}

	addTag(tag) {
		if (!this.tags.has(tag)) {
			this.tags.add(tag);
			this.emit('tagChanged', this.tags);
		}
	}

	hasTag(tag) {
		return this.tags.has(tag);
	}

	removeTag(tag) {
		if (this.tags.delete(tag)) {
			this.emit('tagChanged', this.tags);
		}
	}

}

export default Player;
