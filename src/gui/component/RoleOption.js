
import React from 'react';

import Role from '../../core/Role';
import RoleIcon from './RoleIcon';

class RoleOption extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			selected: false
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {
		this.setState(prev => ({
			selected: !prev.selected
		}));
	}

	render() {
		let role = Role.fromNum(this.props.role);
		let className = this.state.selected ? 'selected' : '';
		return <li className={className} onClick={this.handleClick}>
			<RoleIcon role={role.toNum()} />
			<span className="name">{role.name}</span>
		</li>;
	}
}

export default RoleOption;
