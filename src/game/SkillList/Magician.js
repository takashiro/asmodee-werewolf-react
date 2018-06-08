
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Exchanged = new Marker('Exchanged', '交换');

//魔术师每晚可以交换两名玩家的号码牌
class ExchangeUser extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Magician, '交换', Exchanged);
		this.targetNum = 2;
	}

	effect(room) {
		let targets = this.findTargets(room);
		return targets.length === 2;
	}

}

//当晚所有行动都受到影响
class ExchangeEffect extends PassiveSkill {

	constructor() {
		super(GameEvent.Night, Role.Magician);
	}

	triggerable(room, target) {
		return !target;
	}

	effect(room) {
		let exchanged = room.players.filter(player => player.hasMarker(Exchanged));
		if (exchanged.length != 2) {
			return;
		}

		let markers = [[], []];
		exchanged.forEach((player, i) => {
			player.markers.forEach(marker => {
				markers[i].push(marker);
			});
			player.clearMarkers();
		});

		markers[0].forEach(marker => {
			exchanged[1].addMarker(marker);
		});
		markers[1].forEach(marker => {
			exchanged[0].addMarker(marker);
		});
	}

}

export default [
	ExchangeUser,
	ExchangeEffect,
];
