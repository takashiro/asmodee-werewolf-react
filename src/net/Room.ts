
import { Role } from '@asmodee/werewolf-core';
import Session from './Session';

interface RoomProps {
	id: number;
	salt: string;
	roles: Role[];
	ownerKey?: string;
}

class Room {
	protected id: number;

	protected salt: string;

	protected roles: Role[];

	protected ownerKey?: string;

	protected session: Session<RoomProps>;

	constructor(props?: RoomProps) {
		this.id = 0;
		this.salt = '';
		this.roles = [];
		this.session = new Session('room-session');

		if (props) {
			Object.assign(this, props);
		}
	}

	getId(): number {
		return this.id;
	}

	getRoles(): Role[] {
		return this.roles;
	}

	getOwnerKey(): string | undefined {
		return this.ownerKey;
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
			roles: this.roles,
			ownerKey: this.ownerKey,
		};
	}
}

export default Room;
