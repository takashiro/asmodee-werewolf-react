
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Shot = new Marker('WhiteWolfShot', '狼枪');

//白狼王白天自爆时，可以带走一名玩家
class WolfShot extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.WhiteAlphaWolf, '自爆', Shot);
	}

	effect(room, target) {
		target.setAlive(false);
		this.owner.setAlive(false);
		return true;
	}

}

export default [
	WolfShot,
];
