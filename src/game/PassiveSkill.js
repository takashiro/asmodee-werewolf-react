
class PassiveSkill {

	constructor(role, timing) {
		this.role = role;
		this.timing = timing;
	}

	triggerable(room, target) {
		return target && target.role == this.role;
	}

	effect(room, target) {
		return false;
	}

}

export default PassiveSkill;
