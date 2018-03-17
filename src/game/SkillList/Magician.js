
import Role from '../../core/Role';

import Marker from '../Marker';
import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Exchanged = new Marker('Exchanged', '交换');

//魔术师每晚可以交换两名玩家的号码牌
class ExchangeUser extends ProactiveSkill {

	constructor() {
		super(Role.Magician, '交换', GameEvent.Night);
	}

	effect(room, target) {
		if (!target) {
			return;
		}

		if (target.hasMarker(Exchanged)) {
			target.removeMarker(Exchanged);
			return;
		}

		let prev = room.players.filter(target => target.hasMarker(Exchanged));
		if (prev.length >= 2) {
			prev.shift();
			prev.forEach(player => {
				player.removeMarker(Exchanged);
			});
		}
		target.addMarker(Exchanged);
	}

}

//当晚所有行动都受到影响
class ExchangeEffect extends PassiveSkill {

	constructor() {
		super(Role.Magician, GameEvent.Night);
	}

	triggerable(target) {
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
