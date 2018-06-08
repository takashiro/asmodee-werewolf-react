
class PassiveSkill {

	constructor(timing, role = null) {
		this.timing = timing;
		this.role = role;
		this.priority = 0;
	}

	triggerable(room, target) {
		return target && target.role == this.role;
	}

	effect(room, target) {
		return false;
	}

}

export default PassiveSkill;
