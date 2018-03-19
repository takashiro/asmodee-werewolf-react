
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Guarded = new Marker('Guarded', '守护');

//守卫可以在夜间守护一名玩家
//TODO: 不能连续两晚守护同一名玩家
class UseArmor extends ProactiveSkill {

	constructor() {
		super(Role.Guard, '守护', GameEvent.Night);
	}

	effect(room, target) {
		if (!target) {
			return;
		}

		if (target.hasMarker(Guarded)) {
			target.removeMarker(Guarded);
			return;
		}

		let prev = room.players.find(target => target.hasMarker(Guarded));
		if (prev) {
			prev.removeMarker(Guarded);
		}
		target.addMarker(Guarded);
	}

}

//守护目标当晚受到狼人袭击不会倒牌，但若已经得到女巫解药则仍然倒牌
class ArmorEffect extends PassiveSkill {

	constructor() {
		super(Role.Guard, GameEvent.Night);
	}

	triggerable(room, target) {
		return target && target.hasMarker(Guarded);
	}

	effect(room, target) {
		if (target.hasMarker(Marker.Saved)) {
			//同守同救倒牌
			target.setAlive(false);
		} else {
			target.setAlive(true);
		}
	}

}

export default [
	UseArmor,
	ArmorEffect,
];
