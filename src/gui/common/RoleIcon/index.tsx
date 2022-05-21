import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import './index.scss';

interface RoleIconProps {
	role: Role;
}

function RoleIcon(props: RoleIconProps): JSX.Element {
	const style: React.CSSProperties = {};
	const { role } = props;
	if (role !== Role.Unknown) {
		style.backgroundImage = `url(style/role/${Role[role]}.jpg)`;
	}
	return <div className="role" style={style} />;
}

export default RoleIcon;
