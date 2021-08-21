import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import RoleIcon from '../../../component/RoleIcon';
import RoleLabel from '../../../component/RoleLabel';

import RoleChange from '../../../../model/RoleSelection';

import './index.scss';

interface RoleNumberInputProps {
	role: Role;
	defaultValue: number;
	onChange?: (change: RoleChange) => void;
}

function RoleNumberInput(props: RoleNumberInputProps): JSX.Element {
	const {
		role,
		defaultValue,
		onChange,
	} = props;

	const [value, setValue] = React.useState(defaultValue);

	function emitChange(newValue: number): void {
		if (!onChange) {
			return;
		}

		onChange({
			role,
			value: newValue,
		});
	}

	function handleDecreaseClick(): void {
		const newValue = Math.max(0, value - 1);
		setValue(newValue);
		emitChange(newValue);
	}

	function handleDecreaseKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
		if (e.key === 'Enter' || e.key === 'Space') {
			handleDecreaseClick();
		}
	}

	function handleIncreaseClick(): void {
		const newValue = value + 1;
		setValue(newValue);
		emitChange(newValue);
	}

	function handleIncreaseKeyDown(e: React.KeyboardEvent<HTMLButtonElement>): void {
		if (e.key === 'Enter' || e.key === 'Space') {
			handleIncreaseClick();
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		const newValue = Number.parseInt(e.target.value, 10);
		setValue(newValue);
		emitChange(newValue);
	}

	return (
		<div className="role-selector number-selector">
			<div className="icon">
				<RoleIcon role={role} />
				<RoleLabel role={role} className="name" />
			</div>
			<div className="number-input">
				<button
					type="button"
					className="decrease"
					onClick={handleDecreaseClick}
					onKeyDown={handleDecreaseKeyDown}
				>
					ー
				</button>
				<input
					type="number"
					inputMode="decimal"
					value={value}
					onChange={handleChange}
				/>
				<button
					type="button"
					className="increase"
					onClick={handleIncreaseClick}
					onKeyDown={handleIncreaseKeyDown}
				>
					＋
				</button>
			</div>
		</div>
	);
}

export default RoleNumberInput;
