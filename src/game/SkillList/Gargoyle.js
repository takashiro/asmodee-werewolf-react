
import Role from '../Role';

import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

class GargoyleForecast extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Gargoyle, '查验');
		this.clickable = false;
	}

}

export default [
	GargoyleForecast
];
