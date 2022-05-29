import React from 'react';
import {
	defineMessages,
	injectIntl,
	IntlShape,
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

interface RoomCreatorProps {
	intl: IntlShape;
}

class RoomCreator extends React.Component<RoomCreatorProps> {
	protected config = new RoomConfig();

	constructor(props: RoomCreatorProps) {
		super(props);

		this.config.restore();
	}

	handleReturn = (): void => {
		go(Page.Lobby);
	};

	handleConfirm = async (): Promise<void> => {
		const { intl } = this.props;

		this.config.save();
		const roles = this.config.getRoles();

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
	};

	render(): JSX.Element {
		const { intl } = this.props;
		return (
			<div className="room-creator">
				<div className="team-area">
					<TeamSelector
						team={Team.Werewolf}
						basic={Role.Werewolf}
						config={this.config}
					/>
					<TeamSelector
						team={Team.Villager}
						basic={Role.Villager}
						config={this.config}
					/>
					<TeamSelector
						team={Team.Other}
						config={this.config}
					/>
				</div>
				<div className="button-area">
					<button type="button" onClick={this.handleReturn}>
						{intl.formatMessage(msg.exit)}
					</button>
					<button type="button" onClick={this.handleConfirm}>
						{intl.formatMessage(msg.createRoom)}
					</button>
				</div>
			</div>
		);
	}
}

export default injectIntl(RoomCreator);
