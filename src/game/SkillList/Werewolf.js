
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Attacked = new Marker('Attacked', '狼刀');

//狼人每晚共同行动，选择一名玩家作为击杀目标
class WerewolfAttack extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Werewolf, '狼刀', Attacked);
	}

	effect(room) {
		let target = this.findTarget(room);
		if (!target || !target.isAlive()) {
			return false;
		}

		target.setAlive(false);
		return true;
	}

}

// 白天，狼人可以自爆
const SelfExpose = new Marker('SelfExpose', '自爆');

class WerewolfExpose extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Werewolf, '自爆', SelfExpose);
	}

	isValidTarget(target) {
		return super.isValidTarget(target) && target.state.role === Role.Werewolf;
	}

	effect(room) {
		let target = this.findTarget(room);
		if (!target) {
			return false;
		}

		target.setAlive(false);
		return true;
	}

}

export default [
	WerewolfAttack,
	WerewolfExpose,
];
