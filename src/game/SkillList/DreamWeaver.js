
import Role from '../Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const NightWalker = new Marker('NightWalker', '梦游');

//摄梦人可以在夜间使一名玩家梦游
class WeaveDream extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.DreamWeaver, '摄梦', NightWalker);
	}

	effect(room, target) {
		return !!target;
	}

}

//梦游者不会倒在夜间，但若连续两晚梦游则倒牌
class NightWalkerEffect extends PassiveSkill {

	constructor() {
		super(GameEvent.Dawn, Role.DreamWeaver);
	}

	triggerable(room, target) {
		return target && target.hasMarker(NightWalker);
	}

	effect(room, target) {
		if (target.dreamNight != room.day - 1) {
			target.setAlive(true);
		} else {
			target.setAlive(false);
		}
		target.dreamNight = room.day;
	}

}

//摄梦者若倒牌，则梦游者在黎明倒牌
class DreamLink extends PassiveSkill {

	constructor() {
		super(GameEvent.Dawn, Role.DreamWeaver);
	}

	triggerable(room, target) {
		return super.triggerable(room, target) && !target.isAlive();
	}

	effect(room, target) {
		let night_walker = room.players.find(player => player.hasMarker(NightWalker));
		if (night_walker) {
			night_walker.setAlive(false);
			night_walker.deathReason = [NightWalker];
		}
	}

}

export default [
	WeaveDream,
	NightWalkerEffect,
	DreamLink,
];
