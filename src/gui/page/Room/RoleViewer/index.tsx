import React from 'react';
import {
	defineMessages,
	FormattedMessage,
	injectIntl,
	IntlShape,
} from 'react-intl';
import { Role } from '@asmodee/werewolf-core';

import Player from '../../../../model/Player';
import HttpError from '../../../../model/HttpError';

import RoleIcon from '../../../common/RoleIcon';
import RoleLabel from '../../../common/RoleLabel';

import './index.scss';

const errorMap = new Map<number, React.ReactNode>([
	[404, <FormattedMessage defaultMessage="The room does not exist or may be expired." />],
	[400, <FormattedMessage defaultMessage="The seat does not exist. Please try another one." />],
	[403, <FormattedMessage defaultMessage="Please clean your browser cache and try again later." />],
	[409, <FormattedMessage defaultMessage="The seat is already taken. Please try another one." />],
]);

function formatError(intl: IntlShape, error: HttpError): React.ReactNode {
	const message = errorMap.get(error.code);
	if (message) {
		return message;
	}

	const values: Record<string, string> = {
		code: String(error.code),
		message: error.message,
	};
	return <FormattedMessage defaultMessage="Unknown error ({code}): {message}." values={values} />;
}

const descriptor = defineMessages({
	viewYourRole: { defaultMessage: 'View Your Role' },
	seatNumber: { defaultMessage: 'Seat Number' },
});

interface RoleViewerProps {
	player: Player;
	intl: IntlShape;
}

interface RoleViewerState {
	seat?: number;
	roles?: Role[];
	message?: React.ReactNode;
}

class RoleViewer extends React.Component<RoleViewerProps, RoleViewerState> {
	protected seatNumber: React.RefObject<HTMLInputElement>;

	constructor(props: RoleViewerProps) {
		super(props);

		this.seatNumber = React.createRef();

		const { player } = props;
		player.restore();
		this.state = {
			seat: player.getSeat(),
			roles: player.getRoles(),
		};
	}

	fetchCard = async (): Promise<void> => {
		const { intl } = this.props;
		const seatNumber = this.seatNumber.current;
		if (!seatNumber) {
			return;
		}

		if (!seatNumber.value) {
			this.showMessage(<FormattedMessage defaultMessage="Please input a seat number." />);
			seatNumber.focus();
			return;
		}

		const seat = parseInt(seatNumber.value, 10);
		if (Number.isNaN(seat) || seat <= 0) {
			this.showMessage(<FormattedMessage defaultMessage="Please input a valid number." />);
			seatNumber.value = '';
			seatNumber.focus();
			return;
		}

		const { player } = this.props;
		this.showMessage(<FormattedMessage defaultMessage="Your role is..." />);
		try {
			await player.takeSeat(seat);
		} catch (error) {
			if (error instanceof HttpError) {
				this.showMessage(formatError(intl, error));
			} else {
				this.showMessage(<FormattedMessage defaultMessage="Unknown error." />);
			}
			return;
		}

		player.save();

		const roles = player.getRoles();
		this.setState({
			seat,
			roles,
		});
	};

	showMessage(message: React.ReactNode): void {
		this.setState({ message });
	}

	renderCards(): JSX.Element {
		const { intl } = this.props;
		const { roles } = this.state;
		if (!roles) {
			const { message } = this.state;
			return (
				<div className="role-area button-area">
					<input
						type="number"
						inputMode="decimal"
						placeholder={intl.formatMessage(descriptor.seatNumber)}
						ref={this.seatNumber}
					/>
					<button type="button" onClick={this.fetchCard}>
						{intl.formatMessage(descriptor.viewYourRole)}
					</button>
					<div className="inline-message">
						{message}
					</div>
				</div>
			);
		}

		const { seat } = this.state;
		const [role] = roles;
		const cards = roles.splice(1);

		if (!cards || cards.length <= 0) {
			return (
				<div className="role-area">
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
			<div className="role-area">
				<RoleLabel role={role} className="name" />
				<RoleIcon role={role} />
				<ul className="role-list extra-cards">
					{extraList}
				</ul>
			</div>
		);
	}

	render(): JSX.Element {
		return (
			<div className="box">
				<h3><FormattedMessage defaultMessage="Your Role" /></h3>
				{this.renderCards()}
			</div>
		);
	}
}

export default injectIntl(RoleViewer);
