
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Shot = new Marker('HunterShot', '猎枪');

// 猎人晚上会得知开枪状态
class HunterShotStatus extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Hunter, '开枪状态');
		this.clickable = false;
	}

}

//猎人倒牌时，可以带走场上一名玩家
class HunterShot extends ProactiveSkill {

	constructor() {
		super(GameEvent.Death, Role.Hunter, '猎枪', Shot);
		this.delayed = false;
	}

	isValidTarget(target) {
		return super.isValidTarget(target) && target != this.owner;
	}

	effect(room, target) {
		if (target.isAlive()) {
			target.setAlive(false);
			target.deathDay = this.owner && this.owner.deathDay;
			target.deathReason = [Shot];
		}

		return true;
	}

}

export default [
	HunterShotStatus,
	HunterShot,
];
