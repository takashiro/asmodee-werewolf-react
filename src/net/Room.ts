
import { Role } from '@asmodee/werewolf-core';
import Session from './Session';

interface RoomProps {
	id: number;
	salt: string;
	ownerKey?: string;
	seat?: number;
	roles?: Role[];
}

class Room {
	protected id: number;

	protected salt: string;

	protected ownerKey?: string;

	protected seat?: number;

	protected seatKey?: number;

	protected roles?: Role[];

	protected session: Session<RoomProps>;

	constructor(props?: RoomProps) {
		this.id = 0;
		this.salt = '';
		this.seat = 0;
		this.session = new Session('room-session');

		if (props) {
			Object.assign(this, props);
		}
	}

	getId(): number {
		return this.id;
	}

	getSeat(): number | undefined {
		return this.seat;
	}

	setSeat(seat: number): void {
		this.seat = seat;
	}

	getSeatKey(): number | undefined {
		return this.seatKey;
	}

	setSeatKey(key: number): void {
		this.seatKey = key;
	}

	getRoles(): Role[] | undefined {
		return this.roles;
	}

	setRoles(roles: Role[]): void {
		this.roles = roles;
	}

	getOwnerKey(): string | undefined {
		return this.ownerKey;
	}

	setOwnerKey(key: string): void {
		this.ownerKey = key;
	}

	isOwner(): boolean {
		return Boolean(this.ownerKey);
	}

	restore(): boolean {
		const item = this.session.read(this.salt);
		if (!item || item.id !== this.id) {
			return false;
		}

		if (item.roles) {
			this.roles = item.roles;
		}

		if (item.ownerKey) {
			this.ownerKey = item.ownerKey;
		}

		return true;
	}

	save(expiry?: number): void {
		this.session.write(this.salt, this.toData(), expiry);
	}

	toData(): RoomProps {
		return {
			id: this.id,
			salt: this.salt,
			ownerKey: this.ownerKey,
			seat: this.seat,
			roles: this.roles,
		};
	}
}

export default Room;
