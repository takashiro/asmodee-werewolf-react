
import React from 'react';

import Role from '../../../game/Role';
import {$client, net} from '../../../net/Client';

import RoleIcon from '../../component/RoleIcon';
import Toast from '../../component/Toast';

import './index.scss';

const ERROR_MESSAGE = {
	ROOM_EXPIRED: '房间不存在，可能已过期。',
	INVALID_SEAT: '座位不存在，请重新输入。',
	INVALID_SEATKEY: '请刷新网页缓存，然后重试。',
	SEAT_TAKEN: '该座位已使用，请重新输入。',
	ROOM_FULL: '房间人数已满。'
};

class RoleViewer extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
			visible: true,
			role: null,
			cards: []
		};

		let config = props.config;
		this.roomId = config.id;

		let session = config.readSession();
		if (session) {
			if (session.ownerKey) {
				this.state.visible = false;
			} else {
				if (session.role) {
					this.state.role = Role.fromNum(session.role);
				}
				if (session.cards && session.cards instanceof Array) {
					this.state.cards = session.cards.map(card => Role.fromNum(card));
				}
				if (session.seat) {
					this.state.seat = session.seat;
				}
			}
		}

		this.fetchCard = this.fetchCard.bind(this);
		this.handleSeatInput = this.handleSeatInput.bind(this);
	}

	showMessage(message) {
		this.message.innerHTML = message;
	}

	fetchCard() {
		if (!this.seat) {
			Toast.makeToast('请输入座位号。');
			this.seatNumberInput.focus();
			return;
		}

		let seat = parseInt(this.seat, 10);
		if (isNaN(seat) || seat <= 0) {
			Toast.makeToast('请输入正确的数字。');
			this.seatNumberInput.value = '';
			this.seatNumberInput.focus();
			return;
		}

		let config = this.props.config;
		let session = config.readSession();
		let seatKey = session && session.seatKey;
		if (!seatKey) {
			seatKey = Math.floor(Math.random() * 0xFFFF) + 1;
			config.writeSession({
				seatKey: seatKey,
			});
		}

		this.showMessage('你的身份是...');
		$client.get(net.Role, {
			id: this.roomId,
			seat: this.seat,
			key: seatKey,
		})
		.then(result => {
			let role = Role.fromNum(result.role);
			let cards = [];
			if (result.cards && result.cards instanceof Array) {
				cards = result.cards.map(card => Role.fromNum(card));
			}

			this.setState({
				seat: this.seat,
				role: role,
				cards: cards
			});

			config.writeSession({
				seat: this.seat,
				seatKey: seatKey,
				role: role.toNum(),
				cards: cards.map(card => card.toNum())
			});
		}).catch(error => {
			if (error.code === 404) {
				this.showMessage(ERROR_MESSAGE.ROOM_EXPIRED);
			} else if (error.code === 400 && error.message === 'Invalid seat') {
				this.showMessage(ERROR_MESSAGE.INVALID_SEAT);
			} else if (error.code === 403) {
				this.showMessage(ERROR_MESSAGE.INVALID_SEATKEY);
			} else if (error.code === 409) {
				this.showMessage(ERROR_MESSAGE.SEAT_TAKEN);
			} else {
				this.showMessage(error.message);
			}
		});
	}

	handleSeatInput(e) {
		this.seat = e.target.value;
	}

	renderCard() {
		if (!this.state.role) {
			return <div className="role-area button-area">
				<input
					type="number"
					placeholder="座位号"
					onChange={this.handleSeatInput}
					ref={input => {this.seatNumberInput = input;}}
				/>
				<button type="button" onClick={this.fetchCard}>查看身份</button>
				<div className="inline-message" ref={message => {this.message = message;}}></div>
			</div>;
		}

		let seat = this.state.seat;
		let role = this.state.role;
		let cards = this.state.cards;

		if (cards.length <= 0) {
			return <div className="role-area">
				<div className="name">{seat}号位 {role.name}</div>
				<RoleIcon role={role} />
			</div>;
		} else {
			let key = 0;
			let extra_list = cards.map(role => {
				return <li key={key++}>
					<RoleIcon role={role} />
					<span className="name">{role.name}</span>
				</li>;
			});

			return <div className="role-area">
				<div className="name">{role.name}</div>
				<RoleIcon role={role} />
				<ul className="role-list extra-cards">
					{extra_list}
				</ul>
			</div>;
		}
	}

	render() {
		if (!this.state.visible) {
			return null;
		}

		return <div className="box">
			<h3>你的身份</h3>
			{this.renderCard()}
		</div>;
	}

}

export default RoleViewer;
