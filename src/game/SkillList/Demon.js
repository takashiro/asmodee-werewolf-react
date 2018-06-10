
import Role from '../Role';

import GameEvent from '../GameEvent';
import PassiveSkill from '../PassiveSkill';
import ProactiveSkill from '../ProactiveSkill';

// 恶魔每晚可以单独睁眼，查验一名玩家是否为神
class FindGod extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Demon, '验神');
		this.clickable = false;
	}

}

// 恶魔不能死在夜间
class ImmortalNightmare extends PassiveSkill {

	constructor() {
		super(GameEvent.Dawn, Role.Demon);
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
