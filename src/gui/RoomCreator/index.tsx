import React from 'react';

import {
	Role,
	Team,
} from '@asmodee/werewolf-core';

import Client from '../../model/Client';
import Room from '../../model/Room';
import RoomConfig from '../../model/RoomConfig';

import Toast from '../component/Toast';
import Page from '../Page';

import TeamSelector from './TeamSelector';

import './index.scss';

interface RoomCreatorProps {
	onPageOpen?: (page: Page, room: Room) => void;
}

export default class RoomCreator extends React.Component<RoomCreatorProps> {
	protected config = new RoomConfig();

	constructor(props: RoomCreatorProps) {
		super(props);

		this.config.restore();
	}

	handleReturn = (): void => {
		this.nagivateTo(Page.Lobby);
	}

	handleConfirm = async (): Promise<void> => {
		this.config.save();
		const roles = this.config.getRoles();

		if (roles.length <= 0) {
			Toast.makeToast('请选择角色。 ');
			return;
		} if (roles.length > 50) {
			Toast.makeToast('最大仅支持50人局，请重新配置角色。');
			return;
		}

		const client = new Client();
		const room = new Room(client);
		try {
			await room.create(roles);
		} catch (error) {
			Toast.makeToast(error.message);
			return;
		}

		room.save();
		this.nagivateTo(Page.Room, room);
	}

	nagivateTo(page: Page, room?: Room): void {
		const { onPageOpen } = this.props;
		if (onPageOpen) {
			setTimeout(onPageOpen, 0, page, room);
		}
	}

	render(): JSX.Element {
		return (
			<div className="room-creator">
				<div className="team-area">
					<TeamSelector
						team={Team.Werewolf}
						basic={Role.Werewolf}
						config={this.config}
					/>
					<TeamSelector
						team={Team.Villager}
						basic={Role.Villager}
						config={this.config}
					/>
					<TeamSelector
						team={Team.Other}
						config={this.config}
					/>
				</div>
				<div className="button-area">
					<button type="button" onClick={this.handleReturn}>返回</button>
					<button type="button" onClick={this.handleConfirm}>创建房间</button>
				</div>
			</div>
		);
	}
}
