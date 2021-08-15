import {
	Role,
	RoomConfig,
} from '@asmodee/werewolf-core';

import Client from './Client';
import Session from './Session';
import HttpError from './HttpError';
import Player from './Player';

class Room {
	protected client: Client;

	protected id = 0;

	protected salt = '';

	protected roles: Role[] = [];

	protected playerNum = 0;

	protected ownerKey?: string;

	constructor(client: Client) {
		this.client = client;
	}

	getId(): number {
		return this.id;
	}

	getRoles(): Role[] | undefined {
		return this.roles;
	}

	getPlayerNum(): number {
		return this.playerNum;
	}

	getOwnerKey(): string | undefined {
		return this.ownerKey;
	}

	isOwner(): boolean {
		return Boolean(this.ownerKey);
	}

	createPlayer(): Player {
		const client = this.client.derive(`room/${this.id}`);
		return new Player(client, this.salt);
	}

	save(): boolean {
		if (this.id <= 0) {
			return false;
		}

		const session = new Session<RoomConfig>('room');
		session.write(String(this.id), {
			id: this.id,
			salt: this.salt,
			ownerKey: this.ownerKey,
			roles: this.roles,
			playerNum: this.playerNum,
		});

		return true;
	}

	restore(id: number): boolean {
		const session = new Session<RoomConfig>('room');
		const item = session.read(String(id));
		if (!item) {
			return false;
		}

		this.id = id;
		this.salt = item.salt;
		this.roles = item.roles;
		this.ownerKey = item.ownerKey;
		this.playerNum = item.playerNum;

		return true;
	}

	async enter(id: number): Promise<void> {
		const res = await this.client.get(`/room/${id}`);
		if (res.status !== 200) {
			throw new HttpError(res.status, await res.text());
		}

		const data = await res.json() as RoomConfig;
		this.id = id;
		this.salt = data.salt;
		this.roles = data.roles;
		this.playerNum = data.playerNum;
	}

	async create(roles: Role[]): Promise<void> {
		const res = await this.client.post('/room', {
			roles,
		});
		if (res.status !== 200) {
			throw new HttpError(res.status, await res.text());
		}

		const data = await res.json() as RoomConfig;
		this.id = data.id;
		this.salt = data.salt;
		this.ownerKey = data.ownerKey;
		this.roles = data.roles;
		this.playerNum = data.playerNum;
	}
}

export default Room;
