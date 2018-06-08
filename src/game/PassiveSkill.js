
import Skill from './Skill';

class PassiveSkill extends Skill {

	constructor(timing, role = null) {
		super(timing, role);
	}

	triggerable(room, target) {
		return target && target.role == this.role;
	}

	effect(room, target) {
		return false;
	}

}

export default PassiveSkill;
