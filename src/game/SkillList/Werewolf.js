
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Attacked = new Marker('Attacked', '狼刀');

//狼人每晚共同行动，选择一名玩家作为击杀目标
class WerewolfAttack extends ProactiveSkill {

	constructor() {
		super(Role.Werewolf, '狼刀', GameEvent.Night);
	}

	effect(room, target) {
		if (target) {
			target.toggleMarker(Attacked);
		}
	}

}

//天亮前，狼人的击杀目标死亡
class WerewolfAttackEffect extends PassiveSkill {

	constructor() {
		super(Role.Werewolf, GameEvent.Dawn);
	}

	triggerable(target) {
		return target && target.hasMarker(Attacked);
	}

	effect(room, target) {
		if (target) {
			target.setAlive(false);
		}
	}

}

export default [
	WerewolfAttack,
	WerewolfAttackEffect
];
