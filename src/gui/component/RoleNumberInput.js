
import React from 'react';

import Role from '../../core/Role';

import RoleIcon from './RoleIcon';

class RoleNumberInput extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 0
		};
		if (typeof props.value == 'number' && props.value > 0) {
			this.state.value = props.value;
		}

		this.handleChange = this.handleChange.bind(this);
		this.handleDecrease = this.handleDecrease.bind(this);
		this.handleIncrease = this.handleIncrease.bind(this);
	}

	handleDecrease() {
		this.setState(prev => {
			let state = {value: Math.max(0, prev.value - 1)};
			this.emitChange(state.value);
			return state;
		});
	}

	handleIncrease() {
		this.setState(prev => {
			let state = {value: prev.value + 1};
			this.emitChange(state.value);
			return state;
		});
	}

	handleChange(e) {
		this.setState({value: e.target.value});
		this.emitChange(e.target.value);
	}

	emitChange(value) {
		if (this.props.onChange) {
			this.props.onChange({
				role: this.props.role,
				value: value
			});
		}
	}

	render() {
		let role = this.props.role;
		return <div className="role-selector number-selector">
			<div className="icon">
				<RoleIcon role={role} />
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
