
import Skill from './Skill';

class ProactiveSkill extends Skill {

	constructor(timing, role, name, marker = null) {
		super(timing, role);
		this.name = name;
		this.marker = marker;
		this.clickable = true;
		this.targetFixed = false;
		this.targetNum = 1;
		this.delayed = true;
	}

	isAvailable(room) {
		return true;
	}

	isValidTarget(target) {
		return target && target.isAlive();
	}

	select(room, target) {
		if (!this.isValidTarget(target)) {
			return false;
		}

		if (target.hasMarker(this.marker)) {
			target.removeMarker(this.marker);
			return true;
		}

		if (this.targetNum == 1) {
			let prev = room.players.find(target => target.hasMarker(this.marker));
			if (prev) {
				prev.removeMarker(this.marker);
			}
		} else if (this.targetNum > 1) {
			let prev = room.players.filter(target => target.hasMarker(this.marker));
			if (prev.length >= this.targetNum) {
				return false;
			}
		}

		target.addMarker(this.marker);
		return true;
	}

	findTarget(room) {
		return room.players.find(target => target.hasMarker(this.marker));
	}

	findTargets(room) {
		return room.players.filter(target => target.hasMarker(this.marker));
	}

	effect(room, target = null) {
		return true;
	}
}


export default ProactiveSkill;
