
import React from 'react';

import Team from '../core/Team';
import Role from '../core/Role';

import RoleIcon from './component/RoleIcon';
import RoleViewer from './component/RoleViewer';

function TeamTable(props) {
	let key = 0;
	let icons = props.roles.map(role => <li key={key++}>
		<RoleIcon role={role} />
		<span className="name">{role.name}</span>
	</li>);
	return <div className="box">
		<h3>{props.team.name}</h3>
		<ul className="role-list">{icons}</ul>
	</div>;
}

class Room extends React.Component {

	constructor(props) {
		super(props);
		this.config = props.config;

		this.teams = [];
		let roles = this.config.roles;
		let key = 0;
		Team.List.forEach(team => {
			if (team == Team.Unknown) {
				return;
			}

			let team_roles = roles.filter(role => role.team == team);
			if (team_roles.length > 0) {
				this.teams.push(<TeamTable
					key={key++}
					team={team}
					roles={team_roles}
				/>);
			}
		});
	}

	render() {
		return <div>
			<div className="inline-message">房间号：{this.config.id}</div>
			<div className="role-table">{this.teams}</div>
			<RoleViewer config={this.config} />
		</div>;
	}

}

export default Room;
