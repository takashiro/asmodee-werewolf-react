
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';
import MarkerSkill from '../MarkerSkill';

const Attacked = new Marker('Attacked', '狼刀');

//狼人每晚共同行动，选择一名玩家作为击杀目标
class WerewolfAttack extends MarkerSkill {

	constructor() {
		super(Role.Werewolf, '狼刀', GameEvent.Night);
		this.marker = Attacked;
	}

}

//天亮前，狼人的击杀目标死亡
class WerewolfAttackEffect extends PassiveSkill {

	constructor() {
		super(Role.Werewolf, GameEvent.Night);
	}

	triggerable(room, target) {
		return target && target.hasMarker(Attacked);
	}

	effect(room, target) {
		if (target) {
			target.setAlive(false);
		}
	}

}

// 白天，狼人可以自爆
const SelfExpose = new Marker('SelfExpose', '自爆');

class WerewolfExpose extends ProactiveSkill {

	constructor() {
		super(Role.Werewolf, '自爆', GameEvent.Day);
	}

	effect(room, target) {
		if (target && target.state.role == Role.Werewolf) {
			target.toggleMarker(SelfExpose);
		}
	}

}

class WerewolfExposeEffect extends PassiveSkill {

	constructor() {
		super(Role.Werewolf, GameEvent.Day);
	}

	triggerable(room, target) {
		return super.triggerable(room, target) && target.hasMarker(SelfExpose);
	}

	effect(room, target) {
		if (target.isAlive()) {
			target.setAlive(false);
		}
	}

}

export default [
	WerewolfAttack,
	WerewolfAttackEffect,
	WerewolfExpose,
	WerewolfExposeEffect,
];
