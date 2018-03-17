
import Role from '../../core/Role';

import GameEvent from '../GameEvent';
import ProactiveSkill from '../ProactiveSkill';

class FillRoles extends ProactiveSkill {

	constructor() {
		super(Role.Villager, '补齐', GameEvent.Night);
		this.targetFixed = true;
	}

	effect(room) {
		for (let player of room.players) {
			if (!player.state.role || player.state.role == Role.Unknown) {
				player.setState({
					role: Role.Villager
				});
			}
		}
	}

}

export default [
	FillRoles
];
