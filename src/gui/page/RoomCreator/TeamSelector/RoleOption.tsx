import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import Clickable from '../../../component/Clickable';
import RoleIcon from '../../../component/RoleIcon';
import RoleLabel from '../../../component/RoleLabel';

import RoleChange from '../../../../model/RoleSelection';

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

	function trigger(): void {
		setSelected(!selected);
		if (onChange) {
			onChange({
				role,
				value: !selected ? 1 : 0,
			});
		}
	}

	const classNames = ['role-button'];
	if (selected) {
		classNames.push('selected');
	}
	return (
		<Clickable
			component="div"
			role="button"
			className={classNames.join(' ')}
			onTrigger={trigger}
		>
			<RoleIcon role={role} />
			<RoleLabel role={role} className="name" />
		</Clickable>
	);
}

export default RoleOption;
