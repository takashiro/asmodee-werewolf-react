
class Logger {

	constructor(room, day, timing) {
		this.room = room;
		this.day = day;
		this.timing = timing;
		this.skills = room.proactiveSkills.get(timing);
	}

	get history() {
		let logs = [];
		for (let i = 0; i < this.skills.length; i++) {
			let skill = this.skills[i];
			let targets = this.room.players.filter(player => player.hasMarker(skill.marker));
			if (targets.length > 0) {
				logs.push(skill.marker.name + ' ' + targets.map(target => target.seat).join(','));
			}
		}

		return logs;
	}

	get victims() {
		return this.room.players.filter(player =>
			!player.isAlive()
			&& player.deathDay === this.day
			&& player.deathTiming === this.timing
		);
	}

}

export default Logger;
