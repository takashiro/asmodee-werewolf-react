
import Role from '../../core/Role';
import GameEvent from '../GameEvent';
import PassiveSkill from '../PassiveSkill';
import ProactiveSkill from '../ProactiveSkill';

class MarkRole extends ProactiveSkill {

	constructor() {
		super(Role.Thief, '', GameEvent.Night);
		this.clickable = false;
	}

	isAvailable(room) {
		return room.day == 1;
	}

}

class RoleCount extends PassiveSkill {

	constructor() {
		super(Role.Thief, GameEvent.Start);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		room.playerNum = Math.max(1, room.playerNum - 2);
	}

}

export default [
	MarkRole,
	RoleCount,
];
