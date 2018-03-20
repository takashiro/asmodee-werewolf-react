
import Role from '../core/Role';

import Marker from './Marker';
import GameEvent from './GameEvent';
import PassiveSkill from './PassiveSkill';
import MarkerSkill from './MarkerSkill';

const Executed = new Marker('Executed', '公投');

// 公投
class Execution extends MarkerSkill {

	constructor() {
		super(Role.Villager, '公投', GameEvent.Day);
		this.marker = Executed;
	}

}

// 公投出局玩家倒牌
class AfterExecution extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dusk);
	}

	triggerable(room, target) {
		return target && target.hasMarker(Marker.Executed);
	}

	effect(room, player) {
		player.setAlive(false);
		player.deathDay = room.day;
		player.deathReason = Array.from(player.markers);
	}

}

// 标记死亡玩家时间，清除标记
class DeathGod extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dusk);
	}

	triggerable(room, target) {
		return !!target;
	}

	effect(room, target) {
		if (!target.isAlive() && !target.deathDay) {
			target.deathDay = room.day;
			target.deathReason = Array.from(target.state.markers);
		}
		target.clearMarkers();
	}

}

// 进入下一天
class BrandNewDay extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dusk);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		room.tickDay();
	}

}

export default [
	Execution,
	AfterExecution,
	DeathGod,
	BrandNewDay,
];
