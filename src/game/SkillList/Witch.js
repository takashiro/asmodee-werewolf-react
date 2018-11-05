
import Role from '../Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Saved = new Marker('Saved', '解药');
const Poisoned = new Marker('Poisoned', '毒药');

//女巫可以对当晚被袭击的玩家使用解药
//TODO: 每局游戏限1次
class UseCure extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Witch, '解药', Saved);
		this.targetFixed = true;
	}

	isValidTarget(target) {
		return target && target.hasMarker(Marker.Attacked);
	}

	effect(room, target) {
		target.setAlive(true);
	}

}

class UsePoison extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Witch, '毒药', Poisoned);
	}

	effect(room) {
		let target = this.findTarget(room);
		if (target) {
			target.setAlive(false);
			target.purified = true;
			return true;
		}

		return false;
	}

}

export default [
	UseCure,
	UsePoison,
];
