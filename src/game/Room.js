
import Role from '../core/Role';
import Player from '../game/Player';

class Room {

	constructor(config) {
		this.playerNum = config.roles.length;
		this.players = [];

		for (let i = 0; i < this.playerNum; i++) {
			this.players.push(new Player(i + 1, Role.Unknown));
		}
	}

	findPlayer(condition) {
		return this.players.find(condition);
	}

}

export default Room;
