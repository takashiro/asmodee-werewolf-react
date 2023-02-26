import React from 'react';
import { FormattedMessage } from 'react-intl';

import Player from '../../../../model/Player';
import RoleCard from './RoleCard';
import SeatForm from './SeatForm';

import './index.scss';

interface RoleViewerProps {
	player: Player;
}

export default function RoleViewer({
	player,
}: RoleViewerProps): JSX.Element {
	const titleId = React.useId();
	const [seat, setSeat] = React.useState(() => {
		player.restore();
		return player.getSeat();
	});
	const [roles, setRoles] = React.useState(() => player.getRoles());

	const handleChange = React.useCallback((me: Player) => {
		setSeat(me.getSeat());
		setRoles(me.getRoles());
	}, []);

	return (
		<section className="box" aria-labelledby={titleId}>
			<h2 id={titleId}><FormattedMessage defaultMessage="Your Role" /></h2>
			{!roles ? (
				<SeatForm
					player={player}
					onChange={handleChange}
				/>
			) : (
				<RoleCard
					seat={seat}
					roles={roles}
				/>
			)}
		</section>
	);
}
