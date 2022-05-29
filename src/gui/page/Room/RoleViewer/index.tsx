import React from 'react';
import {
	defineMessages,
	FormattedMessage,
	useIntl,
} from 'react-intl';

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

function formatError(error: HttpError): React.ReactNode {
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
}

export default function RoleViewer({
	player,
}: RoleViewerProps): JSX.Element {
	const intl = useIntl();
	const seatNumberRef = React.useRef<HTMLInputElement>(null);

	const [seat, setSeat] = React.useState(() => {
		player.restore();
		return player.getSeat();
	});
	const [roles, setRoles] = React.useState(player.getRoles());
	const [message, setMessage] = React.useState<React.ReactNode>();

	async function fetchCard(): Promise<void> {
		const seatNumber = seatNumberRef.current;
		if (!seatNumber) {
			return;
		}

		if (!seatNumber.value) {
			setMessage(<FormattedMessage defaultMessage="Please input a seat number." />);
			seatNumber.focus();
			return;
		}

		const seat = parseInt(seatNumber.value, 10);
		if (Number.isNaN(seat) || seat <= 0) {
			setMessage(<FormattedMessage defaultMessage="Please input a valid number." />);
			seatNumber.value = '';
			seatNumber.focus();
			return;
		}

		setMessage(<FormattedMessage defaultMessage="Your role is..." />);
		try {
			await player.takeSeat(seat);
		} catch (error) {
			if (error instanceof HttpError) {
				setMessage(formatError(error));
			} else {
				setMessage(<FormattedMessage defaultMessage="Unknown error." />);
			}
			return;
		}

		player.save();

		const roles = player.getRoles();
		setSeat(seat);
		setRoles(roles);
	}

	function renderCards(): JSX.Element {
		if (!roles) {
			return (
				<div className="role-viewer button-area">
					<input
						type="number"
						inputMode="decimal"
						placeholder={intl.formatMessage(descriptor.seatNumber)}
						ref={seatNumberRef}
					/>
					<button type="button" onClick={fetchCard}>
						{intl.formatMessage(descriptor.viewYourRole)}
					</button>
					<div className="inline-message">
						{message}
					</div>
				</div>
			);
		}

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

	return (
		<div className="box">
			<h2><FormattedMessage defaultMessage="Your Role" /></h2>
			{renderCards()}
		</div>
	);
}
