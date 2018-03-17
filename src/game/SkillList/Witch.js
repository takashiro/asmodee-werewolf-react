
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Saved = new Marker('Saved', '解药');
const Poisoned = new Marker('Poisoned', '毒药');

//女巫可以对当晚被袭击的玩家使用解药
//TODO: 每局游戏限1次
class UseCure extends ProactiveSkill {

	constructor() {
		super(Role.Witch, '解药', GameEvent.Night);
		this.targetFixed = true;
	}

	effect(room) {
		let target = room.players.find(target => target.hasMarker(Marker.Attacked));
		if (target) {
			target.toggleMarker(Saved);
		}
	}

}

//解药救回袭击目标
class CureEffect extends PassiveSkill {

	constructor() {
		super(Role.Witch, GameEvent.Night);
	}

	triggerable(target) {
		return target && target.hasMarker(Saved);
	}

	effect(room, target) {
		target.setAlive(true);
	}

}

class UsePoison extends ProactiveSkill {

	constructor() {
		super(Role.Witch, '毒药', GameEvent.Night);
	}

	effect(room, target) {
		if (!target) {
			return;
		}

		if (target.hasMarker(Poisoned)) {
			target.removeMarker(Poisoned);
			return;
		}

		let prev = room.players.find(player => player.hasMarker(Poisoned));
		if (prev) {
			prev.removeMarker(Poisoned);
		}
		target.addMarker(Poisoned);
	}

}

//被毒杀的玩家天亮前倒牌，并失去技能
class PoisonEffect extends PassiveSkill {

	constructor() {
		super(Role.Witch, GameEvent.Night);
	}

	triggerable(target) {
		return target && target.hasMarker(Poisoned);
	}

	effect(room, target) {
		target.setAlive(false);
		// TODO: all skills will be lost
	}

}

export default [
	UseCure,
	UsePoison,
	CureEffect,
	PoisonEffect,
];
