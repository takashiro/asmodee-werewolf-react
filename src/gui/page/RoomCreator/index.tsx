import React from 'react';
import {
	defineMessages,
	useIntl,
} from 'react-intl';

import {
	Role,
	Team,
} from '@asmodee/werewolf-core';

import { client } from '../../../model/Client';
import Room from '../../../model/Room';
import RoomConfig from '../../../model/RoomConfig';
import HttpError from '../../../model/HttpError';
import Page from '../../../model/Page';
import go from '../../../util/go';

import { makeToast } from '../../common/Toast';

import TeamSelector from './TeamSelector';

import './index.scss';

const msg = defineMessages({
	rejectZeroRoles: { defaultMessage: 'Please select some roles.' },
	rejectTooManyRoles: { defaultMessage: 'You can choose no more than 50 roles. Please unselect some of them.' },
	exit: { defaultMessage: 'Exit' },
	createRoom: { defaultMessage: 'Start' },
});

export default function RoomCreator(): JSX.Element {
	const intl = useIntl();

	const config = React.useMemo(() => {
		const config = new RoomConfig();
		config.restore();
		return config;
	}, []);

	function handleReturn(): void {
		go(Page.Lobby);
	}

	async function handleConfirm(): Promise<void> {
		config.save();
		const roles = config.getRoles();

		if (roles.length <= 0) {
			makeToast(intl.formatMessage(msg.rejectZeroRoles));
			return;
		} if (roles.length > 50) {
			makeToast(intl.formatMessage(msg.rejectTooManyRoles));
			return;
		}

		const room = new Room(client);
		try {
			await room.create(roles);
		} catch (error) {
			if (error instanceof HttpError) {
				makeToast(error.message);
			}
			return;
		}

		room.save();
		go(Page.Room, { id: room.getId() });
	}

	return (
		<div className="room-creator">
			<div className="team-area">
				<TeamSelector
					team={Team.Werewolf}
					basic={Role.Werewolf}
					config={config}
				/>
				<TeamSelector
					team={Team.Villager}
					basic={Role.Villager}
					config={config}
				/>
				<TeamSelector
					team={Team.Other}
					config={config}
				/>
			</div>
			<div className="button-area">
				<button type="button" onClick={handleReturn}>
					{intl.formatMessage(msg.exit)}
				</button>
				<button type="button" onClick={handleConfirm}>
					{intl.formatMessage(msg.createRoom)}
				</button>
			</div>
		</div>
	);
}
