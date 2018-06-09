
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Guarded = new Marker('Guarded', '守护');

//守卫可以在夜间守护一名玩家
//守护目标当晚受到狼人袭击不会倒牌，但若已经得到女巫解药则仍然倒牌
//TODO: 不能连续两晚守护同一名玩家
class UseArmor extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Guard, '守护', Guarded);
	}

	effect(room, target) {
		if (target.hasMarker(Marker.Attacked)) {
			if (target.hasMarker(Marker.Saved)) {
				//同守同救倒牌
				target.setAlive(false);
			} else {
				target.setAlive(true);
			}
		}

		return true;
	}

}

export default [
	UseArmor,
];
