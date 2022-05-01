import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Role } from '@asmodee/werewolf-core';

import Button from '../../../../component/Button';
import RoleIcon from '../../../../component/RoleIcon';
import RoleLabel from '../../../../component/RoleLabel';

import RoleChange from '../../../../../model/RoleSelection';

import './index.scss';

const desc = defineMessages({
	decrease: { defaultMessage: 'decrease' },
	increase: { defaultMessage: 'increase' },
});

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

	const intl = useIntl();
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

	function handleDecrease(): void {
		const newValue = Math.max(0, value - 1);
		setValue(newValue);
		emitChange(newValue);
	}

	function handleIncrease(): void {
		const newValue = value + 1;
		setValue(newValue);
		emitChange(newValue);
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
				<Button
					role="button"
					className="decrease"
					onTrigger={handleDecrease}
					aria-label={intl.formatMessage(desc.decrease)}
				/>
				<input
					type="number"
					inputMode="decimal"
					value={value}
					onChange={handleChange}
				/>
				<Button
					role="button"
					className="increase"
					onTrigger={handleIncrease}
					aria-label={intl.formatMessage(desc.increase)}
				/>
			</div>
		</div>
	);
}

export default RoleNumberInput;
