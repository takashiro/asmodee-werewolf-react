
class Skill {

	constructor(timing, role) {
		this.timing = timing;
		this.role = role;
		this.priority = 0;
	}

	belongsTo(player) {
		return this.role === player.role;
	}

}

export default Skill;
