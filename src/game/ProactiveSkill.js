
class ProactiveSkill {

	constructor(timing, role, name, marker = null) {
		this.timing = timing;
		this.role = role;
		this.name = name;
		this.marker = marker;
		this.clickable = true;
		this.targetFixed = false;
		this.targetNum = 1;
		this.priority = 0;
	}

	isAvailable(room) {
		return true;
	}

	isValidTarget(target) {
		return target && target.isAlive();
	}

	select(room, target) {
		if (!this.isValidTarget(target)) {
			return;
		}

		if (target.hasMarker(this.marker)) {
			target.removeMarker(this.marker);
			return;
		}

		if (this.targetNum == 1) {
			let prev = room.players.find(target => target.hasMarker(this.marker));
			if (prev) {
				prev.removeMarker(this.marker);
			}
		} else if (this.targetNum > 1) {
			let prev = room.players.filter(target => target.hasMarker(this.marker));
			if (prev.length >= this.targetNum) {
				return;
			}
		}

		target.addMarker(this.marker);
	}

	findTarget(room) {
		return room.players.find(target => target.hasMarker(this.marker));
	}

	findTargets(room) {
		return room.players.filter(target => target.hasMarker(this.marker));
	}

	effect(room) {
	}
}


export default ProactiveSkill;
