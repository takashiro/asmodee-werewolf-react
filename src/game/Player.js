
class Player {

	constructor(seat, role) {
		this.seat = seat;
		this.role = role;
		this.alive = true;
		this.selected = false;
		//TODO: 技能失效
		this.purified = false;
		this.markers = new Set;
		this.tags = new Set;
	}

	addMarker(marker) {
		this.markers.add(marker);
	}

	removeMarker(marker) {
		this.markers.delete(marker);
	}

	hasMarker(marker) {
		return this.markers.has(marker);
	}

	toggleMarker(marker) {
		if (this.hasMarker(marker)) {
			this.removeMarker(marker);
		} else {
			this.addMarker(marker);
		}
	}

	clearMarkers() {
		this.markers.clear();
	}

	addTag(marker) {
		this.tags.add(marker);
	}

	removeTag(marker) {
		this.tags.delete(marker);
	}

	hasTag(marker) {
		return this.tags.has(marker);
	}

}

export default Player;
