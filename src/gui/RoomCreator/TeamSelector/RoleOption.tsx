import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import RoleIcon from '../../component/RoleIcon';
import RoleLabel from '../../component/RoleLabel';

import RoleChange from '../RoleSelection';

interface RoleOptionProps {
	role: Role;
	defaultSelected: boolean;
	onChange?: (change: RoleChange) => void;
}

function RoleOption(props: RoleOptionProps): JSX.Element {
	const {
		role,
		defaultSelected,
		onChange,
	} = props;

	const [selected, setSelected] = React.useState(defaultSelected);

	function handleClick(): void {
		setSelected(!selected);
		if (onChange) {
			onChange({
				role,
				value: !selected ? 1 : 0,
			});
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>): void {
		if (e.key === 'Enter' || e.key === 'Space') {
			handleClick();
		}
	}

	const classNames = ['role-button'];
	if (selected) {
		classNames.push('selected');
	}
	return (
		<div
			className={classNames.join(' ')}
			role="button"
			tabIndex={0}
			onClick={handleClick}
			onKeyDown={handleKeyDown}
		>
			<RoleIcon role={role} />
			<RoleLabel role={role} className="name" />
		</div>
	);
}

export default RoleOption;