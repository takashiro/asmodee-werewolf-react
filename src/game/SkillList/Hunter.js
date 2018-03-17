
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Shot = new Marker('HunterShot', '猎枪');

// 猎人晚上会得知开枪状态
class HunterShotStatus extends ProactiveSkill {

	constructor() {
		super(Role.Hunter, '开枪状态', GameEvent.Night);
		this.clickable = false;
	}

}

//猎人倒牌时，可以带走场上一名玩家
class HunterShot extends ProactiveSkill {

	constructor() {
		super(Role.Hunter, '猎枪', GameEvent.Death);
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
	HunterShotStatus,
	HunterShot,
];
