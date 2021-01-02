
import React from 'react';
import { Role } from '@asmodee/werewolf-core';

import './index.scss';

interface RoleIconProps {
	role: Role;
}

function RoleIcon(props: RoleIconProps): JSX.Element {
	let style: React.CSSProperties = {};
	let role = props.role;
	if (role !== Role.Unknown) {
		style.backgroundImage = `url(style/role/${Role[role]}.jpg)`;
	}
	return <div className="role" style={style}></div>;
}

export default RoleIcon;
