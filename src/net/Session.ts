interface SessionItem {
	expiry: number;
}

export default class Session {
	protected key: string;

	constructor(key: string) {
		this.key = key;
	}

	list() {
		const sessionData = localStorage.getItem(this.key);
		let sessions: Record<string, SessionItem> = {};
		if (sessionData) {
			try {
				sessions = JSON.parse(sessionData);
			} catch (e) {
				alert(e.toString());
			}
		}

		// Clear expired sessions
		const now = new Date().getTime();
		for (const key of Object.keys(sessions)) {
			const session = sessions[key];
			if (!session.expiry || session.expiry <= now) {
				delete sessions[key];
			}
		}

		return sessions;
	}

	read(key: string): SessionItem | undefined {
		const sessions = this.list();
		return sessions[key];
	}

	write(key: string, value: SessionItem, expiry?: number): void {
		const sessions = this.list();
		value.expiry = expiry || new Date().getTime() + 1000 * 60 * 60;
		sessions[key] = value;
		localStorage.setItem(this.key, JSON.stringify(sessions));
	}
}
