
import Role from '../Role';

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

	effect(room, exchanged) {
		if (exchanged.length != 2) {
			return false;
		}

		let markers = [[], []];
		exchanged.forEach((player, i) => {
			markers[i] = Array.from(player.markers);
			player.clearMarkers();
		});

		for (let marker of markers[0]) {
			exchanged[1].addMarker(marker);
		}
		for (let marker of markers[1]) {
			exchanged[0].addMarker(marker);
		}

		return true;
	}

}

export default [
	ExchangeUser,
];
