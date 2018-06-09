
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
		super(GameEvent.Night, Role.Cupid, '情侣', Couple);
		this.targetNum = 2;
	}

	isAvailable(room) {
		return room.day == 1;
	}

	effect(room, targets) {
		for (let target of targets) {
			target.removeMarker(Couple);
			target.addTag(Couple);
		}

		return true;
	}

}

//情侣总是同时倒牌
class DieForLove extends PassiveSkill {

	constructor() {
		super(GameEvent.Death, Role.Cupid);
	}

	triggerable(room, target) {
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
