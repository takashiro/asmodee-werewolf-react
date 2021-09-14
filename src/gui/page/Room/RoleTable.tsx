import React from 'react';
import {
	Role,
	Team,
	Teamship,
} from '@asmodee/werewolf-core';

import TeamProfile from './TeamProfile';

interface Props {
	roles: Role[];
}

export default function RoleTable(props: Props): JSX.Element {
	const teams = Object.values(Team).filter((team) => !Number.isNaN(team)) as Team[];
	const { roles } = props;
	let key = 0;
	return (
		<div className="role-table">
			{teams.map((team) => {
				if (!team) {
					return null;
				}

				const teamRoles = roles.filter((role) => Teamship.get(role) === team);
				if (teamRoles.length <= 0) {
					return null;
				}

				return (
					<TeamProfile
						key={key++}
						team={team}
						roles={teamRoles}
					/>
				);
			})}
		</div>
	);
}
