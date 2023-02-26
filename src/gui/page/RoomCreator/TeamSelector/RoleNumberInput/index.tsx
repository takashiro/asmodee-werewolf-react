import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Role } from '@asmodee/werewolf-core';

import { Clickable } from '../../../../common/Clickable';
import RoleIcon from '../../../../common/RoleIcon';
import RoleLabel, { roleNames } from '../../../../common/RoleLabel';

import RoleChange from '../../../../../model/RoleSelection';

import './index.scss';

const desc = defineMessages({
	decrease: { defaultMessage: 'decrease {name}' },
	increase: { defaultMessage: 'increase {name}' },
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
	const input = React.useRef<HTMLInputElement>(null);

	const handleChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>): void => {
			const newValue = Number.parseInt(e.target.value, 10);
			onChange?.({
				role,
				value: newValue,
			});
		},
		[role],
	);

	const handleSpin = React.useCallback((delta: number): void => {
		const num = input.current;
		if (!num) {
			return;
		}
		const value = Number.parseInt(num.value, 10);
		const newValue = Math.max(0, value + delta);
		num.value = String(newValue);
		onChange?.({
			role,
			value: newValue,
		});
	}, [role]);

	const handleDecrease = React.useCallback(() => handleSpin(-1), [handleSpin]);
	const handleIncrease = React.useCallback(() => handleSpin(1), [handleSpin]);

	const labelId = React.useId();
	const name = intl.formatMessage(roleNames[role]);
	return (
		<div className="role-selector number-selector">
			<div className="icon" id={labelId}>
				<RoleIcon role={role} />
				<RoleLabel role={role} className="name" />
			</div>
			<div className="number-input">
				<Clickable
					component="div"
					role="button"
					className="decrease"
					onTrigger={handleDecrease}
					aria-label={intl.formatMessage(desc.decrease, { name })}
				/>
				<input
					ref={input}
					type="number"
					inputMode="decimal"
					defaultValue={defaultValue}
					onChange={handleChange}
					aria-labelledby={labelId}
				/>
				<Clickable
					component="div"
					role="button"
					className="increase"
					onTrigger={handleIncrease}
					aria-label={intl.formatMessage(desc.increase, { name })}
				/>
			</div>
		</div>
	);
}

export default RoleNumberInput;
