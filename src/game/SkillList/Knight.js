
import Role from '../../core/Role';
import Team from '../../core/Team';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Dueled = new Marker('Dueled', '决斗');

class Duel extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Knight, '决斗', Dueled);
	}

	effect(room, target) {
		if (target.role.team === Team.Werewolf) {
			target.setAlive(false);
		} else {
			this.owner.setAlive(false);
		}

		return true;
	}

}

export default [
	Duel
];
