
import React from 'react';

import Team from '../../core/Team';
import Role from '../../core/Role';

import RoleOption from './RoleOption';
import RoleNumberInput from './RoleNumberInput';

class TeamSelector extends React.Component {

	constructor(props) {
		super(props);
		let config = this.props.config;

		this.team = this.props.team;
		this.handleChange = this.handleChange.bind(this);

		if (this.props.basic) {
			this.basicNum = 0;
			if (config) {
				let basic = this.props.basic.toNum();
				if (config.has(basic)) {
					this.basicNum =  config.get(basic);
				}
			}
		}

		let roles = Role.List.filter(role => role != Role.Unknown
			&& role != props.basic
			&& role.team == props.team);
		this.roles = roles.map(role => <RoleOption
			key={role.key}
			role={role}
			selected={this.props.config && this.props.config.get(role.toNum())}
			onChange={this.handleChange}
		/>);
	}

	handleChange(data) {
		if (this.props.onChange) {
			this.props.onChange(data);
		}
	}

	render() {
		if (this.props.basic) {
			return <div className="box">
				<h3>{this.team.name}</h3>
				<RoleNumberInput
					role={this.props.basic}
					value={this.basicNum}
					onChange={this.handleChange}
				/>
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
