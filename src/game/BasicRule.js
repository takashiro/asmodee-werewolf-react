
import Marker from './Marker';
import GameEvent from './GameEvent';
import PassiveSkill from './PassiveSkill';

const Executed = new Marker('Executed', '公投');

// 公投
class Execution extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dawn);
	}

	triggerable(target) {
		return !target;
	}

	effect(room) {
		room.action = Execution.MarkAction;
	}

	static MarkAction(target) {
		target.toggleMarker(Executed);
	}

}

// 公投出局玩家倒牌
class AfterExecution extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dusk);
	}

	triggerable(target) {
		return target && target.hasMarker(Marker.Executed);
	}

	effect(room, player) {
		player.setAlive(false);
	}

}

// 标记死亡玩家时间，清除标记
class DeathGod extends PassiveSkill {

	constructor() {
		super(null, GameEvent.Dusk);
	}

	triggerable(target) {
		return !!target;
	}

	effect(room, target) {
		if (!target.isAlive() && !target.deathDay) {
			target.deathDay = room.state.day;
		}
		target.clearMarkers();
	}

}

export default [
	Execution,
	AfterExecution,
	DeathGod,
];
