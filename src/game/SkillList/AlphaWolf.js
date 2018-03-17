
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Shot = new Marker('WolfShot', '狼枪');

// 狼王晚上会得知开枪状态
class WolfShotStatus extends ProactiveSkill {

	constructor() {
		super(Role.AlphaWolf, '开枪状态', GameEvent.Night);
		this.clickable = false;
	}

}

//狼王倒牌时，可以带走场上一名玩家
class WolfShot extends ProactiveSkill {

	constructor() {
		super(Role.AlphaWolf, '反扑', GameEvent.Death);
	}

	effect(room, target) {
		if (target.hasMarker(Shot)) {
			target.removeMarker(Shot);
			target.setAlive(true);
		} else {
			if (!target || !target.isAlive()) {
				return;
			}

			let prev = room.players.find(player => player.hasMarker(Shot));
			if (prev) {
				prev.removeMarker(Shot);
				prev.setAlive(true);
				prev.deathDay = 0;
			}

			target.addMarker(Shot);
			target.setAlive(false);
			target.deathDay = this.owner && this.owner.deathDay;
		}
	}

}

export default [
	WolfShotStatus,
	WolfShot,
];
