
import ProactiveSkill from '../ProactiveSkill';

import Role from '../Role';
import GameEvent from '../GameEvent';
import Marker from '../Marker';

const Cursed = new Marker('Curse', '诅咒');

class Curse extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Crow, '诅咒', Cursed);
	}

	effect(room, target) {
		return !!target;
	}

}

export default [
	Curse,
];
