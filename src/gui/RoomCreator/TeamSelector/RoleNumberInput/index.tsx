
import React from 'react';

import RoleIcon from '../../../component/RoleIcon';
import RoleLabel from '../../../component/RoleLabel';
import RoleChange from '../../RoleChange';

import './index.scss';

interface RoleNumberInputProps extends RoleChange {
	onChange?: (change: RoleChange) => void;
}

interface RoleNumberInputState {
	value: number;
}

class RoleNumberInput extends React.Component<RoleNumberInputProps, RoleNumberInputState> {
	constructor(props: RoleNumberInputProps) {
		super(props);
		this.state = {
			value: typeof props.value == 'number' && props.value > 0 ? props.value : 0,
		};
	}

	handleDecrease = (): void => {
		this.setState(prev => {
			let state = {value: Math.max(0, prev.value - 1)};
			this.emitChange(state.value);
			return state;
		});
	}

	handleIncrease = (): void => {
		this.setState(prev => {
			let state = {value: prev.value + 1};
			this.emitChange(state.value);
			return state;
		});
	}

	handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const value = parseInt(e.target.value, 10);
		this.setState({ value });
		this.emitChange(value);
	}

	emitChange(value: number): void {
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
				<RoleLabel role={role} className="name" />
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
