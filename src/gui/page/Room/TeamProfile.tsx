import React from 'react';
import {
	Role,
	Team,
} from '@asmodee/werewolf-core';

import RoleIcon from '../../common/RoleIcon';
import TeamLabel from '../../common/TeamLabel';
import RoleLabel from '../../common/RoleLabel';

interface Props {
	team: Team;
	roles: Role[];
}

export default function TeamProfile(props: Props): JSX.Element {
	const {
		team,
		roles,
	} = props;

	let key = 0;
	const icons = roles.map((role) => (
		<li key={key++}>
			<RoleIcon role={role} />
			<RoleLabel className="name" role={role} />
		</li>
	));
	return (
		<div className="box">
			<h2><TeamLabel team={team} /></h2>
			<ul className="role-list">{icons}</ul>
		</div>
	);
}
