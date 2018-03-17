
import Role from '../../core/Role';

import GameEvent from '../GameEvent';
import PassiveSkill from '../PassiveSkill';
import ProactiveSkill from '../ProactiveSkill';

// 恶魔每晚可以单独睁眼，查验一名玩家是否为神
class FindGod extends ProactiveSkill {

	constructor() {
		super(Role.Demon, '验神', GameEvent.Night);
		this.clickable = false;
	}

}

// 恶魔不能死在夜间
class ImmortalNightmare extends PassiveSkill {

	constructor() {
		super(Role.Demon, GameEvent.Dawn);
	}

	effect(room, target) {
		if (!target.isAlive()) {
			target.setAlive(true);
		}
	}

}

export default [
	FindGod,
	ImmortalNightmare,
];
