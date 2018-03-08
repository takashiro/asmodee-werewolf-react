import React from 'react';
import ReactDOM from 'react-dom';

import Team from '../core/Team';
import Role from '../core/Role';

import Lobby from './Lobby';
import TeamSelector from './component/TeamSelector';

import RoleIcon from './component/RoleIcon';
//import Room from './Room';
let Room = React.Component;

export default class RoomCreator extends React.Component {

	constructor(props) {
		super(props);

		this.roleConfig = new Map;
		this.restoreConfig();

		this.handleChange = this.handleChange.bind(this);
		this.handleReturn = this.handleReturn.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
	}

	restoreConfig() {
		if (!window.localStorage) {
			return;
		}

		let config = localStorage.getItem('room-config');
		if (!config) {
			return;
		}

		try {
			config = JSON.parse(config);
		} catch (e) {
			return;
		}

		if (!(config instanceof Array)) {
			return;
		}

		for (let item of config) {
			let role = Role.fromNum(item.role);
			if (role == Role.Unknown) {
				continue;
			}

			if (typeof item.value == 'number') {
				this.roleConfig.set(role.toNum(), Math.max(0, item.value));
			} else if (!!item.value) {
				this.roleConfig.set(role.toNum(), true);
			}
		}
	}

	saveConfig() {
		if (!window.localStorage) {
			return;
		}

		let config = [];
		this.roleConfig.forEach((value, key) => {
			config.push({
				role: key,
				value: value
			});
		});
		localStorage.setItem('room-config', JSON.stringify(config));
	}

	handleChange(data) {
		if (!data.role || data.role == Role.Unknown) {
			return;
		}
		if (typeof data.selected == 'boolean') {
			this.roleConfig.set(data.role, data.selected);
		} else if (typeof data.value == 'number') {
			this.roleConfig.set(data.role, Math.max(0, data.value));
		}
	}

	handleReturn() {
		ReactDOM.render(
			<Lobby />,
			document.getElementById('root')
		);
	}

	handleConfirm() {
		this.saveConfig();
	}

	render() {
		return <div className="room-creator">
			<TeamSelector
				team={Team.Werewolf.toNum()}
				basic={Role.Werewolf.toNum()}
				config={this.roleConfig}
				onChange={this.handleChange}
			/>
			<TeamSelector
				team={Team.Villager.toNum()}
				basic={Role.Villager.toNum()}
				config={this.roleConfig}
				onChange={this.handleChange}
			/>
			<TeamSelector
				team={Team.Other.toNum()}
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
