
import React from 'react';

import Team from '../../core/Team';
import Role from '../../core/Role';

import RoleOption from './RoleOption';
import RoleNumberInput from './RoleNumberInput';

class TeamSelector extends React.Component {

	constructor(props) {
		super(props);

		this.team = Team.fromNum(this.props.team);
		this.handleChange = this.handleChange.bind(this);

		if (this.props.basic) {
			this.basicNum = 0;
			if (this.props.config && this.props.config.has(this.props.basic)) {
				this.basicNum = this.props.config.get(this.props.basic);
			}
		}

		let roles = Role.List.filter(role => role != Role.Unknown
			&& role.toNum() != props.basic
			&& role.team.toNum() == props.team);
		this.roles = roles.map(role => <RoleOption
			key={role.key}
			role={role.toNum()}
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
