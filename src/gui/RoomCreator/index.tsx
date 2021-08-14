import React from 'react';

import {
	Role,
	Team,
 } from '@asmodee/werewolf-core';

import Client from '../../model/Client';
import Room from '../../model/Room';

import Toast from '../component/Toast';
import Page from '../Page';

import TeamSelector from './TeamSelector';
import RoleSelection from './RoleSelection';

interface RoomCreatorProps {
	onPageNavigated?: (page: Page, room: Room) => void;
}

const defaultConfig: RoleSelection[] = [
	{ role: Role.Werewolf, value: 4 },
	{ role: Role.Villager, value: 4 },
	{ role: Role.Seer, value: 1 },
	{ role: Role.Witch, value: 1 },
	{ role: Role.Hunter, value: 1 },
	{ role: Role.Idiot, value: 1 },
];

function readConfig(): RoleSelection[] | undefined {
	const data = localStorage.getItem('room-config');
	if (!data) {
		return defaultConfig;
	}


	let config: RoleSelection[] = [];
	try {
		config = JSON.parse(data);
	} catch (e) {
		return defaultConfig;
	}

	if (config instanceof Array) {
		return config;
	}

	return defaultConfig;
}

export default class RoomCreator extends React.Component<RoomCreatorProps> {
	protected roleConfig: Map<Role, number>;

	constructor(props: RoomCreatorProps) {
		super(props);

		this.roleConfig = new Map;
		this.restoreConfig();
	}

	restoreConfig() {
		if (!window.localStorage) {
			return;
		}

		const config = readConfig();
		if (!config) {
			return;
		}

		for (let item of config) {
			const { role } = item;
			if (!role) {
				continue;
			}

			const { value } = item;
			if (value > 0) {
				this.roleConfig.set(role, value);
			}
		}
	}

	saveConfig() {
		if (!window.localStorage) {
			return;
		}

		let config: RoleSelection[] = [];
		for (const [key, value] of this.roleConfig) {
			config.push({
				role: key,
				value: value
			});
		}
		localStorage.setItem('room-config', JSON.stringify(config));
	}

	nagivateTo(page: Page, room?: Room): void {
		const { onPageNavigated } = this.props;
		if (onPageNavigated) {
			setTimeout(onPageNavigated, 0, page, room);
		}
	}

	handleChange = (data: RoleSelection): void => {
		if (!data.role) {
			return;
		}

		if (data.value > 0) {
			this.roleConfig.set(data.role, data.value);
		} else {
			this.roleConfig.delete(data.role);
		}
	}

	handleReturn = (): void => {
		this.nagivateTo(Page.Lobby);
	}

	handleConfirm = async (): Promise<void> => {
		this.saveConfig();

		let roles: number[] = [];
		this.roleConfig.forEach((value, role) => {
			if (typeof value == 'number') {
				for (let i = 0; i < value; i++) {
					roles.push(role);
				}
			} else if (value) {
				roles.push(role);
			}
		});

		if (roles.length <= 0) {
			return Toast.makeToast('请选择角色。 ');
		} else if (roles.length > 50) {
			return Toast.makeToast('最大仅支持50人局，请重新配置角色。');
		}

		const client = new Client('api');
		const room = new Room(client);
		try {
			await room.create(roles);
		} catch (error) {
			alert(error.message);
			return;
		}

		room.save();
		this.nagivateTo(Page.Room, room);
	}

	render() {
		return <div className="room-creator">
			<TeamSelector
				team={Team.Werewolf}
				basic={Role.Werewolf}
				config={this.roleConfig}
				onChange={this.handleChange}
			/>
			<TeamSelector
				team={Team.Villager}
				basic={Role.Villager}
				config={this.roleConfig}
				onChange={this.handleChange}
			/>
			<TeamSelector
				team={Team.Other}
				config={this.roleConfig}
				onChange={this.handleChange}
			/>
			<div className="button-area">
				<button type="button" onClick={this.handleReturn}>返回</button>
				<button type="button" onClick={this.handleConfirm}>创建房间</button>
			</div>
		</div>;
	}
}
