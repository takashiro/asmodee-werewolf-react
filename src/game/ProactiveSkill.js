
class ProactiveSkill {

	constructor(role, name, timing) {
		this.role = role;
		this.name = name;
		this.timing = timing;
		this.clickable = true;
		this.targetFixed = false;
	}

	isAvailable(room) {
		return true;
	}

	effect(room, target) {
	}
}


export default ProactiveSkill;
