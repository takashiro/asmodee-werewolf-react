
import Role from '../../core/Role';
import Team from '../../core/Team';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

const Dueled = new Marker('Dueled', '决斗');

class Duel extends ProactiveSkill {

	constructor() {
		super(Role.Knight, '决斗', GameEvent.Day);
	}

	effect(room, target) {
		if (!target) {
			return;
		}

		if (!target.isAlive()) {
			if (target.hasMarker(Dueled)) {
				target.removeMarker(Dueled);
				target.setAlive(true);
			}
			return;
		}

		let prev = room.players.find(player => player.hasMarker(Dueled));
		if (prev) {
			prev.removeMarker(Dueled);
			prev.setAlive(true);
		}

		let loser = target;
		if (target.role.team != Team.Werewolf) {
			loser = room.players.find(player => player.role == Role.Knight);
		}

		if (loser) {
			loser.addMarker(Dueled);
			loser.setAlive(false);
		}
	}

}

export default [Duel];
