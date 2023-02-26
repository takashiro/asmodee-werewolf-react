import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Role } from '@asmodee/werewolf-core';

import RoleLabel from '../../../common/RoleLabel';
import RoleIcon from '../../../common/RoleIcon';

interface RoleCardProps {
	seat: number;
	roles: Role[];
}

export default function RoleCard({
	seat,
	roles,
}: RoleCardProps): JSX.Element {
	const [role] = roles;
	const cards = roles.splice(1);

	if (!cards || cards.length <= 0) {
		return (
			<div className="role-viewer">
				<div className="name">
					<FormattedMessage defaultMessage="Seat {seat}" values={{ seat }} />
					{' '}
					<RoleLabel role={role} />
				</div>
				<RoleIcon role={role} />
			</div>
		);
	}
	let key = 0;
	const extraList = cards.map((role) => (
		<li key={key++}>
			<RoleIcon role={role} />
			<RoleLabel role={role} className="name" />
		</li>
	));

	return (
		<div className="role-viewer">
			<RoleLabel role={role} className="name" />
			<RoleIcon role={role} />
			<ul className="role-list extra-cards">
				{extraList}
			</ul>
		</div>
	);
}
