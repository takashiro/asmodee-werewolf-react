
import Role from '../Role';
import Team from '../Team';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Dueled = new Marker('Dueled', '决斗');

class Duel extends ProactiveSkill {

	constructor() {
		super(GameEvent.Day, Role.Knight, '决斗', Dueled);
		this.delayed = false;
	}

	effect(room, target) {
		let loser = target;
		if (target.role.team !== Team.Werewolf) {
			loser = this.owner;
		}

		loser.addMarker(Dueled);
		loser.setAlive(false);
		loser.deathReason = [Dueled];

		return true;
	}

}

export default [
	Duel
];
