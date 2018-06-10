
import Role from '../Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Shot = new Marker('WolfShot', '狼枪');

// 狼王晚上会得知开枪状态
class WolfShotStatus extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.AlphaWolf, '开枪状态', Shot);
		this.clickable = false;
	}

}

//狼王倒牌时，可以带走场上一名玩家
class WolfShot extends ProactiveSkill {

	constructor() {
		super(GameEvent.Death, Role.AlphaWolf, '反扑', Shot);
		this.delayed = false;
	}

	isValidTarget(target) {
		return super.isValidTarget(target) && target != this.owner;
	}

	effect(room, target) {
		let timing = room.timing;
		room.timing = this.owner.deathTiming;
		room.killPlayer(target);
		room.timing = timing;
		return true;
	}

}

export default [
	WolfShotStatus,
	WolfShot,
];
