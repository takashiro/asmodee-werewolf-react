
import Role from '../../core/Role';
import GameEvent from '../GameEvent';
import PassiveSkill from '../PassiveSkill';
import ProactiveSkill from '../ProactiveSkill';

class MarkRole extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Thief, '');
		this.clickable = false;
	}

	isAvailable(room) {
		return room.day == 1;
	}

}

export default [
	MarkRole,
];
