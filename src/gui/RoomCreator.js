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

		//TODO: Read from local storage

		this.handleReturn = this.handleReturn.bind(this);
		this.handleConfirm = this.handleConfirm.bind(this);
	}

	handleReturn() {
		ReactDOM.render(
			<Lobby />,
			document.getElementById('root')
		);
	}

	handleConfirm() {
	}

	render() {
		return <div className="room-creator">
			<TeamSelector team={Team.Werewolf.toNum()} basic={Role.Werewolf.toNum()} />
			<TeamSelector team={Team.Villager.toNum()} basic={Role.Villager.toNum()} />
			<TeamSelector team={Team.Other.toNum()} />
			<div className="button-area">
				<button type="button" onClick={this.handleReturn}>返回</button>
				<button type="button" onClick={this.handleConfirm}>创建房间</button>
			</div>
		</div>;
	}
}
