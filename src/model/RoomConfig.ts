import { Role } from '@asmodee/werewolf-core';

import RoleSelection from './RoleSelection';

const defaultRoles: RoleSelection[] = [
	{ role: Role.Werewolf, value: 4 },
	{ role: Role.Villager, value: 4 },
	{ role: Role.Seer, value: 1 },
	{ role: Role.Witch, value: 1 },
	{ role: Role.Hunter, value: 1 },
	{ role: Role.Idiot, value: 1 },
];

export default class RoomConfig {
	protected key: string;

	protected roleMap: Map<Role, number> = new Map();

	constructor(key = 'room-config') {
		this.key = key;
	}

	read(): RoleSelection[] | undefined {
		if (!window.localStorage) {
			return defaultRoles;
		}

		const data = localStorage.getItem(this.key);
		if (!data) {
			return defaultRoles;
		}

		let config: RoleSelection[] = [];
		try {
			config = JSON.parse(data);
		} catch (e) {
			return defaultRoles;
		}

		if (config instanceof Array) {
			return config;
		}

		return defaultRoles;
	}

	restore(): void {
		const config = this.read();
		if (!config) {
			return;
		}

		for (const item of config) {
			const { role } = item;
			if (!role) {
				continue;
			}

			const { value } = item;
			if (value > 0) {
				this.roleMap.set(role, value);
			}
		}
	}

	save(): void {
		if (!window.localStorage) {
			return;
		}

		const config: RoleSelection[] = [];
		for (const [key, value] of this.roleMap) {
			config.push({
				role: key,
				value,
			});
		}
		localStorage.setItem(this.key, JSON.stringify(config));
	}

	update(data: RoleSelection): void {
		if (!data.role) {
			return;
		}

		if (data.value > 0) {
			this.roleMap.set(data.role, data.value);
		} else {
			this.roleMap.delete(data.role);
		}
	}

	getRole(role: Role): number {
		return this.roleMap.get(role) || 0;
	}

	getRoles(): Role[] {
		const roles: Role[] = [];
		this.roleMap.forEach((value, role) => {
			if (typeof value === 'number') {
				for (let i = 0; i < value; i++) {
					roles.push(role);
				}
			} else if (value) {
				roles.push(role);
			}
		});
		return roles;
	}
}
