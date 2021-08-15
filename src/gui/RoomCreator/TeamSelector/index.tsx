import React from 'react';
import {
	Role,
	Team,
	Teamship,
} from '@asmodee/werewolf-core';

import TeamLabel from '../../component/TeamLabel';
import RoleOption from './RoleOption';
import RoleNumberInput from './RoleNumberInput';
import RoleChange from '../RoleSelection';

import './index.scss';

interface TeamSelectorProps {
	team: Team;
	config: Map<Role, number>;
	basic?: Role;
	onChange?: (change: RoleChange) => void;
}

export default function TeamSelector(props: TeamSelectorProps): JSX.Element {
	const {
		team,
		basic,
		config,
		onChange,
	} = props;

	const allRoles = Object.values(Role).filter((role) => Number.isInteger(role)) as number[];
	const teamRoles = allRoles.filter((role) => role !== Role.Unknown && role !== basic && Teamship.get(role) === team);
	const basicNum = (basic && config.get(basic)) || 0;

	return (
		<div className="box">
			<h3><TeamLabel team={team} /></h3>
			{basic && (
				<RoleNumberInput
					role={basic}
					defaultValue={basicNum}
					onChange={onChange}
				/>
			)}
			<ul className="role-selector">
				{teamRoles.map((role) => (
					<li key={Role[role]}>
						<RoleOption
							role={role}
							defaultSelected={Boolean(config.get(role))}
							onChange={onChange}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
