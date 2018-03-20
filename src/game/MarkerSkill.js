
import ProactiveSkill from './ProactiveSkill';

class MarkerSkill extends ProactiveSkill {

	constructor(role, name, timing) {
		super(role, name, timing);
		this.maxMarkerNum = 1;
	}

	effect(room, target) {
		if (!target || !target.isAlive()) {
			return;
		}

		if (target.hasMarker(this.marker)) {
			target.removeMarker(this.marker);
			return;
		}

		if (this.maxMarkerNum == 1) {
			let prev = room.players.find(target => target.hasMarker(this.marker));
			if (prev) {
				prev.removeMarker(this.marker);
			}
		} else if (this.maxMarkerNum > 1) {
			let prev = room.players.filter(target => target.hasMarker(this.marker));
			if (prev.length >= this.maxMarkerNum) {
				return;
			}
		}

		target.addMarker(this.marker);
	}

}

export default MarkerSkill;
