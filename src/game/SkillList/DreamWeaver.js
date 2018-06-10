
import Role from '../Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const NightWalker = new Marker('NightWalker', '摄梦');

//摄梦人可以在夜间使一名玩家梦游
class WeaveDream extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.DreamWeaver, '摄梦', NightWalker);
	}

	effect(room, target) {
		if (target.dreamNight === room.day - 1) {
			target.dreamOverwhelmed = true;
			target.setAlive(false);
		}
		target.dreamNight = room.day;
	}

}

//梦游者不会倒在夜间
class NightWalkerEffect extends PassiveSkill {

	constructor() {
		super(GameEvent.Killed, Role.DreamWeaver);
	}

	triggerable(room, target) {
		return room.timing === GameEvent.Night
			&& target
			&& target.hasMarker(NightWalker)
			&& !target.isAlive()
			&& !target.dreamOverwhelmed;
	}

	effect(room, target) {
		target.setAlive(true);
	}

}

//摄梦者若夜间倒牌，则梦游者在夜间倒牌
class DreamLink extends PassiveSkill {

	constructor() {
		super(GameEvent.Death, Role.DreamWeaver);
	}

	triggerable(room, target) {
		return super.triggerable(room, target)
		&& room.timing === GameEvent.Night
		&& !target.isAlive();
	}

	effect(room, target) {
		let night_walker = room.players.find(player => player.hasMarker(NightWalker));
		if (night_walker) {
			night_walker.dreamOverwhelmed = true;
			room.killPlayer(night_walker);
		}
	}

}

export default [
	WeaveDream,
	NightWalkerEffect,
	DreamLink,
];
