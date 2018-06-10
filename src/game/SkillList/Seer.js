
import Role from '../Role';

import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

class SeerForecast extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Seer, '查验');
		this.clickable = false;
	}

}

export default [
	SeerForecast
];
