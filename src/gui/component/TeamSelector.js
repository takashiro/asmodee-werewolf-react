
import React from 'react';

import Team from '../../core/Team';
import Role from '../../core/Role';

import RoleOption from './RoleOption';
import RoleNumberInput from './RoleNumberInput';

class TeamSelector extends React.Component {

	constructor(props) {
		super(props);

		this.team = Team.fromNum(this.props.team);

		let roles = Role.List.filter(role => role != Role.Unknown
			&& role.toNum() != props.basic
			&& role.team.toNum() == props.team);
		this.roles = roles.map(role => <RoleOption key={role.key} role={role.toNum()}/>);
	}

	render() {
		if (this.props.basic) {
			return <div className="box">
				<h3>{this.team.name}</h3>
				<RoleNumberInput role={this.props.basic} />
				<ul className="role-selector">{this.roles}</ul>
			</div>;
		} else {
			return <div className="box">
				<h3>{this.team.name}</h3>
				<ul className="role-selector">{this.roles}</ul>
			</div>;
		}
	}

}

export default TeamSelector;
