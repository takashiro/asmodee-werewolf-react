interface SessionItem<DataType> {
	data: DataType;
	expiry: number;
}

export default class Session<DataType> {
	protected key: string;

	constructor(key: string) {
		this.key = key;
	}

	protected readAll(): Record<string, SessionItem<DataType>> {
		const sessionData = localStorage.getItem(this.key);
		let sessions: Record<string, SessionItem<DataType>> = {};
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

	read(key: string): DataType | undefined {
		const sessions = this.readAll();
		const item = sessions[key];
		return item && item.data;
	}

	write(key: string, data: DataType, expiry?: number): void {
		const sessions = this.readAll();
		sessions[key] = {
			data,
			expiry: expiry || new Date().getTime() + 1000 * 60 * 60,
		};
		localStorage.setItem(this.key, JSON.stringify(sessions));
	}
}
