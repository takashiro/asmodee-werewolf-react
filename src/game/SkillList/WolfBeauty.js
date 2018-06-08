
import Role from '../../core/Role';

import GameEvent from '../GameEvent';
import Marker from '../Marker';
import ProactiveSkill from '../ProactiveSkill';
import PassiveSkill from '../PassiveSkill';

const Charmed = new Marker('Charmed', '魅惑');

// 狼美人夜间单独行动，魅惑一名玩家。
class BeautyCharm extends ProactiveSkill {

	constructor() {
		super(GameEvent.Night, Role.WolfBeauty, '魅惑', Charmed);
	}

	effect(room) {
		return !!this.findTarget(room);
	}

}

// TODO: 不能连续两晚魅惑同一名玩家。

// 狼美人死亡时，前夜被魅惑的玩家殉情
class DieForLove extends PassiveSkill {

	constructor() {
		super(GameEvent.Death, Role.WolfBeauty);
	}

	triggerable(room, target) {
		return super.triggerable(room, target) && !target.isAlive() && !target.purified;
	}

	effect(room, target) {
		const lover = room.players.find(player => player.hasMarker(Charmed));
		if (lover && lover.isAlive()) {
			lover.setAlive(false);
		}
	}

}

export default [
	BeautyCharm,
	DieForLove
];
