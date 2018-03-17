
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Shot = new Marker('WhiteWolfShot', '狼枪');

//白狼王白天自爆时，可以带走一名玩家
class WolfShot extends ProactiveSkill {

	constructor() {
		super(Role.WhiteAlphaWolf, '自爆', GameEvent.Day);
	}

	effect(room, target) {
		if (target.hasMarker(Shot)) {
			target.removeMarker(Shot);
		} else if (target.isAlive()) {
			let prev = room.players.find(player => player.hasMarker(Shot));
			if (prev) {
				prev.removeMarker(Shot);
			}
			target.addMarker(Shot);
		}
	}

}

class ShotEffect extends PassiveSkill {

	constructor() {
		super(Role.WhiteAlphaWolf, GameEvent.Day);
	}

	triggerable(target) {
		return target && target.hasMarker(Shot);
	}

	effect(room, target) {
		let wolf = room.players.find(player => player.state.role == Role.WhiteAlphaWolf);
		if (wolf) {
			wolf.setAlive(false);
		}
		target.setAlive(false);
	}

}

export default [
	WolfShot,
	ShotEffect,
];
