
import Role from '../core/Role';
import Session from './Session';

class RoomConfig {

	constructor(state = null) {
		this.id = 0;
		this.salt = 0;
		this.roles = [];
		this.session = new Session('room-session');

		if (state) {
			this.restoreState(state);
		}
	}

	readSession() {
		return this.session.read(this.salt);
	}

	writeSession(value, expiry) {
		this.session.write(this.salt, value, expiry);
	}

	restoreState(result) {
		if (result.id) {
			this.id = result.id;
		}
		if (result.salt) {
			this.salt = result.salt;
		}
		if (result.roles && result.roles instanceof Array) {
			this.roles = result.roles.map(num => Role.fromNum(num));
		}
	}
}

export default RoomConfig;
