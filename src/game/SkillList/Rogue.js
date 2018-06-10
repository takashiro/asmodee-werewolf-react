
import PassiveSkill from '../PassiveSkill';

import Role from '../Role';
import GameEvent from '../GameEvent';
import Marker from '../Marker';

const Wounded = new Marker('Wounded', '负伤');

// 老流氓夜间倒牌时，进入负伤状态，但不会立即死亡
class Struggle extends PassiveSkill {

	constructor() {
		super(GameEvent.Killed, Role.Rogue);
	}

	triggerable(room, target) {
		return super.triggerable(room, target)
			&& room.timing === GameEvent.Night
			&& !target.isAlive()
			&& (target.hasMarker(Marker.Poisoned) || target.hasMarker(Marker.Attacked));
	}

	effect(room, target) {
		target.addMarker(Wounded);
		target.setAlive(true);
	}

}

// 白天，负伤状态的老流氓死亡
class RogueDeath extends PassiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Rogue);
	}

	triggerable(room, target) {
		return super.triggerable(room, target) && target.isAlive() && target.hasMarker(Wounded);
	}

	effect(room, target) {
		room.killPlayer(target);
	}

}

// 老流氓不会被魅惑
class Discharm extends PassiveSkill {

	constructor() {
		super(GameEvent.Dawn, Role.Rogue);
	}

	triggerable(room, target) {
		return super.triggerable(room, target) && target.hasMarker(Marker.Charmed);
	}

	effect(room, target) {
		target.removeMarker(Marker.Charmed);
	}

}

export default [
	Struggle,
	RogueDeath,
	Discharm,
];
