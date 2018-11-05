
import Role from '../Role';

import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

class KeepGraveyard extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.GraveyardKeeper, '守墓');
		this.clickable = false;
	}

	isAvailable(room) {
		return room.day > 1;
	}

}

export default [
	KeepGraveyard
];
