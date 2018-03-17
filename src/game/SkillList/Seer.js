
import Role from '../../core/Role';

import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

class SeerForecast extends ProactiveSkill {

	constructor() {
		super(Role.Seer, '查验', GameEvent.Night);
		this.clickable = false;
	}

}

export default [
	SeerForecast
];
