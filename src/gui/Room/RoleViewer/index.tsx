import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import Player from '../../../model/Player';

import RoleIcon from '../../component/RoleIcon';
import RoleLabel from '../../component/RoleLabel';
import * as Toast from '../../component/Toast';

import './index.scss';

const errorMap = new Map<number, string>();
errorMap.set(404, '房间不存在，可能已过期。');
errorMap.set(400, '座位不存在，请重新输入。');
errorMap.set(403, '请刷新网页缓存，然后重试。');
errorMap.set(409, '该座位已使用，请重新输入。');

interface RoleViewerProps {
	player: Player;
}

interface RoleViewerState {
	seat?: number;
	roles?: Role[];
}

class RoleViewer extends React.Component<RoleViewerProps, RoleViewerState> {
	protected seatNumber: React.RefObject<HTMLInputElement>;

	protected message: React.RefObject<HTMLDivElement>;

	constructor(props: RoleViewerProps) {
		super(props);

		this.seatNumber = React.createRef();
		this.message = React.createRef();

		const { player } = props;
		player.restore();
		this.state = {
			seat: player.getSeat(),
			roles: player.getRoles(),
		};
	}

	fetchCard = async (): Promise<void> => {
		const seatNumber = this.seatNumber.current;
		if (!seatNumber) {
			return;
		}

		if (!seatNumber.value) {
			Toast.makeToast('请输入座位号。');
			seatNumber.focus();
			return;
		}

		const seat = parseInt(seatNumber.value, 10);
		if (Number.isNaN(seat) || seat <= 0) {
			Toast.makeToast('请输入正确的数字。');
			seatNumber.value = '';
			seatNumber.focus();
			return;
		}

		const { player } = this.props;
		this.showMessage('你的身份是...');
		try {
			await player.takeSeat(seat);
		} catch (error) {
			const message = errorMap.get(error.code) || `未知错误 (${error.code})：${error.message}`;
			this.showMessage(message);
			return;
		}

		player.save();

		const roles = player.getRoles();
		this.setState({
			seat,
			roles,
		});
	}

	showMessage(message: string): void {
		const container = this.message.current;
		if (container) {
			container.innerHTML = message;
		}
	}

	renderCards(): JSX.Element {
		const { roles } = this.state;
		if (!roles) {
			return (
				<div className="role-area button-area">
					<input
						type="number"
						inputMode="decimal"
						placeholder="座位号"
						ref={this.seatNumber}
					/>
					<button type="button" onClick={this.fetchCard}>查看身份</button>
					<div className="inline-message" ref={this.message} />
				</div>
			);
		}

		const { seat } = this.state;
		const [role] = roles;
		const cards = roles.splice(1);

		if (!cards || cards.length <= 0) {
			return (
				<div className="role-area">
					<div className="name">
						{seat}
						号位
						{' '}
						<RoleLabel role={role} />
					</div>
					<RoleIcon role={role} />
				</div>
			);
		}
		let key = 0;
		const extraList = cards.map((role) => (
			<li key={key++}>
				<RoleIcon role={role} />
				<RoleLabel role={role} className="name" />
			</li>
		));

		return (
			<div className="role-area">
				<RoleLabel role={role} className="name" />
				<RoleIcon role={role} />
				<ul className="role-list extra-cards">
					{extraList}
				</ul>
			</div>
		);
	}

	render(): JSX.Element {
		return (
			<div className="box">
				<h3>你的身份</h3>
				{this.renderCards()}
			</div>
		);
	}
}

export default RoleViewer;
