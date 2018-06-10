
import Role from './Role';

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
		room.killPlayer(target);
	}
}

// 标记死亡玩家时间
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
		}
	}

}

// 进入下一天
class BrandNewDay extends PassiveSkill {

	constructor() {
		super(GameEvent.Evening);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		for (let player of room.players) {
			player.clearMarkers();
			player.emit('selected', false);
		}
		room.tickDay();
	}

}

export default [
	NightDeath,
	Execution,
	DeathGod,
	BrandNewDay,
];
