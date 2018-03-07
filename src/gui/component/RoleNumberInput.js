
import React from 'react';

import Role from '../../core/Role';

import RoleIcon from './RoleIcon';

class RoleNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleDecrease = this.handleDecrease.bind(this);
		this.handleIncrease = this.handleIncrease.bind(this);
	}

	handleDecrease() {
		this.setState(prev => {
			value: Math.max(0, prev.value - 1)
		});
	}

	handleIncrease() {
		this.setState(prev => {
			value: prev.value + 1
		});
	}

	handleChange(e) {
		this.setState({value: e.target.value});
	}

	render() {
		let role = Role.fromNum(this.props.role);
		return <div className="role-selector number-selector">
			<div className="icon">
				<RoleIcon role={role.toNum()} />
				<span className="name">{role.name}</span>
			</div>
			<div className="number-input">
				<div className="decrease" onClick={this.handleDecrease}></div>
				<input type="number" value={this.state.value} onChange={this.handleChange} />
				<div className="increase" onClick={this.handleIncrease}></div>
			</div>
		</div>;
	}
}

export default RoleNumberInput;
