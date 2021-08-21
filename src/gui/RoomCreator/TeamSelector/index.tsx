import React from 'react';
import {
	Role,
	Team,
	Teamship,
} from '@asmodee/werewolf-core';

import RoomConfig from '../../../model/RoomConfig';
import RoleSelection from '../../../model/RoleSelection';

import TeamLabel from '../../component/TeamLabel';
import RoleOption from './RoleOption';
import RoleNumberInput from './RoleNumberInput';

import './index.scss';

interface TeamSelectorProps {
	team: Team;
	config: RoomConfig;
	basic?: Role;
}

export default function TeamSelector(props: TeamSelectorProps): JSX.Element {
	const {
		team,
		basic,
		config,
	} = props;

	const allRoles = Object.values(Role).filter((role) => Number.isInteger(role)) as number[];
	const teamRoles = allRoles.filter((role) => role !== Role.Unknown && role !== basic && Teamship.get(role) === team);
	const basicNum = (basic && config.getRole(basic)) || 0;

	function onChange(change: RoleSelection): void {
		config.update(change);
	}

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
							defaultSelected={Boolean(config.getRole(role))}
							onChange={onChange}
						/>
					</li>
				))}
			</ul>
		</div>
	);
}
