
import Role from '../core/Role';

import Marker from './Marker';
import GameEvent from './GameEvent';
import ProactiveSkill from './ProactiveSkill';
import PassiveSkill from './PassiveSkill';

// 夜间倒牌结算
class NightDeath extends PassiveSkill {

	constructor() {
		super(GameEvent.Dawn);
	}

	triggerable(room, target) {
		return target && !target.isAlive();
	}

	effect(room, player) {
		room.trigger(GameEvent.Death, player);
	}

}

// 公投
const Executed = new Marker('Executed', '公投');
class Execution extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Villager, '公投', Executed);
		this.delayed = false;
	}

	effect(room, target) {
		target.setAlive(false);
		target.deathDay = room.day;
		target.deathReason = [Executed];
	}
}

// 标记死亡玩家时间，清除标记
class DeathGod extends PassiveSkill {

	constructor() {
		super(GameEvent.Dusk);
	}

	triggerable(room, target) {
		return !!target;
	}

	effect(room, target) {
		if (!target.isAlive() && !target.deathDay) {
			target.deathDay = room.day;
			target.deathReason = Array.from(target.markers);
		}
		target.clearMarkers();
		target.emit('selected', false);
	}

}

// 进入下一天
class BrandNewDay extends PassiveSkill {

	constructor() {
		super(GameEvent.Dusk);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		room.tickDay();
	}

}

export default [
	NightDeath,
	Execution,
	DeathGod,
	BrandNewDay,
];
