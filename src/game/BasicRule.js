
import Role from './Role';

import Marker from './Marker';
import GameEvent from './GameEvent';
import ProactiveSkill from './ProactiveSkill';
import PassiveSkill from './PassiveSkill';

// 一天开始
class NightFall extends PassiveSkill {

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
		room.timing = GameEvent.Night;
		room.emit('evening');
		room.tickDay();
	}

}

// 夜间倒牌结算
class NightDeath extends PassiveSkill {

	constructor() {
		super(GameEvent.Night);
	}

	triggerable(room, target) {
		return target && !target.isAlive() && !target.deathDay;
	}

	effect(room, player) {
		room.trigger(GameEvent.Killed, player);
		if (!player.isAlive()) {
			player.deathDay = room.day;
			player.deathTiming = GameEvent.Night;
			room.trigger(GameEvent.Death, player);
		}
	}

}

// 天亮
class MorningLight extends PassiveSkill {

	constructor() {
		super(GameEvent.Morning);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		room.timing = GameEvent.Day;
		room.emit('morning');
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

export default [
	NightFall,
	NightDeath,
	MorningLight,
	Execution,
];
