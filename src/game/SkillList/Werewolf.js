
import Role from '../Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Attacked = new Marker('Attacked', '狼刀');

//狼人每晚共同行动，选择一名玩家作为击杀目标
class WerewolfAttack extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Werewolf, '狼刀', Attacked);
		this.singleton = true;
	}

	belongsTo(player) {
		return this.role.team === player.role.team;
	}

	effect(room, target) {
		target.setAlive(false);
		return true;
	}

}

// 白天，狼人可以自爆
const SelfExpose = new Marker('SelfExpose', '自爆');

class WerewolfExpose extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Werewolf, '自爆', SelfExpose);
		this.singleton = true;
		this.delayed = false;
	}

	isValidTarget(target) {
		return super.isValidTarget(target) && target.role === Role.Werewolf;
	}

	effect(room, target) {
		room.killPlayer(target);
		return true;
	}

}

WerewolfAttack.singleton = new WerewolfAttack;
WerewolfExpose.singleton = new WerewolfExpose;

export default [
	WerewolfAttack,
	WerewolfExpose,
];
