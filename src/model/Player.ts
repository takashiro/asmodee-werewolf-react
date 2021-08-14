import {
	Role,
	PlayerProfile,
} from '@asmodee/werewolf-core';

import Client from './Client';
import HttpError from './HttpError';
import Session from './Session';

interface PlayerSession extends PlayerProfile {
	seatKey: string;
}

export default class Player {
	protected client: Client;

	protected salt: string;

	protected seat = 0;

	protected seatKey?: string;

	protected roles?: Role[];

	constructor(client: Client, salt: string) {
		this.client = client;
		this.salt = salt;
	}

	getSeat(): number {
		return this.seat;
	}

	getSeatKey(): string | undefined {
		return this.seatKey;
	}

	getRoles(): Role[] | undefined {
		return this.roles;
	}

	save(): boolean {
		if (this.seat <= 0 || !this.seatKey || !this.roles) {
			return false;
		}

		const session = new Session<PlayerSession>('player');
		session.write(this.salt, {
			seat: this.seat,
			seatKey: this.seatKey,
			roles: this.roles,
		});

		return true;
	}

	restore(): boolean {
		const session = new Session<PlayerSession>('player');
		const data = session.read(this.salt);
		if (!data) {
			return false;
		}

		const { seat } = data;
		if (typeof seat !== 'number') {
			return false;
		}

		const { seatKey } = data;
		if (typeof seatKey !== 'string') {
			return false;
		}

		const { roles } = data;
		if (!Array.isArray(roles)) {
			return false;
		}

		this.seat = seat;
		this.seatKey = seatKey;
		this.roles = roles;

		return true;
	}

	async takeSeat(seat: number): Promise<void> {
		if (this.seat) {
			return;
		}

		const { seatKey = String(Math.floor(Math.random() * 0xFFFF)) } = this;
		const query = new URLSearchParams({
			seatKey,
		});
		const res = await this.client.get(`/seat/${seat}?${query.toString()}`);
		if (res.status !== 200) {
			throw new HttpError(res.status, await res.text());
		}

		const data = await res.json() as PlayerProfile;
		this.seatKey = seatKey;
		this.seat = data.seat;
		this.roles = data.roles;
	}
}
