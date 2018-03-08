
class Session {

	constructor(key) {
		this.key = key;
	}

	list() {
		let sessions = localStorage.getItem(this.key);
		if (sessions) {
			try {
				sessions = JSON.parse(sessions);
			} catch (e) {
				alert(e.toString());
				sessions = {};
			}
		} else {
			sessions = {};
		}

		// Clear expired sessions
		let now = new Date().getTime();
		for (let key in sessions) {
			let session = sessions[key];
			if (!session.expiry || session.expiry <= now) {
				delete sessions[key];
			}
		}

		return sessions;
	}

	read(key) {
		let sessions = this.list();
		return sessions[key];
	}

	write(key, value, expiry) {
		let sessions = this.list();
		value.expiry = expiry ? expiry : new Date().getTime() + 1000 * 60 * 60;
		sessions[key] = value;
		localStorage.setItem(this.key, JSON.stringify(sessions));
	};

};

export default Session;
