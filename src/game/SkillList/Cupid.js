
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Couple = new Marker('Couple', '情侣');
const ForLove = new Marker('DieForLove', '殉情');

//丘比特第一夜选择两名玩家结为情侣
class DecideCouple extends ProactiveSkill {

	constructor() {
		super(Role.Cupid, '情侣', GameEvent.Night);
	}

	effect(room, target) {
		if (!target) {
			return;
		}

		if (target.hasTag(Couple)) {
			target.removeTag(Couple);
			return;
		}

		let prev = room.players.filter(target => target.hasTag(Couple));
		if (prev.length >= 2) {
			prev.shift();
			prev.forEach(player => {
				player.removeTag(Couple);
			});
		}
		target.addTag(Couple);
	}

}

//情侣总是同时倒牌
class DieForLove extends PassiveSkill {

	constructor() {
		super(Role.Cupid, GameEvent.Death);
	}

	triggerable(target) {
		return target && target.hasTag(Couple) && !target.isAlive();
	}

	effect(room, target) {
		let couples = room.players.filter(player => player.hasTag(Couple));
		couples.forEach(couple => {
			if (couple.isAlive()) {
				couple.addMarker(ForLove);
				couple.setAlive(false);
			}
		});
	}

}

export default [
	DecideCouple,
	DieForLove,
];
