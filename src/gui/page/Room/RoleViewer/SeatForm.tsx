import React from 'react';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';

import HttpError from '../../../../model/HttpError';
import Player from '../../../../model/Player';

const descriptor = defineMessages({
	viewYourRole: { defaultMessage: 'View Your Role' },
	seatNumber: { defaultMessage: 'Seat Number' },
});

interface SeatFormProps {
	player: Player;
	onChange?(player: Player): void;
}

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

export default function SeatForm({
	player,
	onChange,
}: SeatFormProps): JSX.Element {
	const intl = useIntl();
	const seatNumber = React.useRef<HTMLInputElement>(null);
	const [message, setMessage] = React.useState<React.ReactNode>();

	async function handleSubmit(): Promise<void> {
		const seatInput = seatNumber.current;
		if (!seatInput) {
			return;
		}

		if (!seatInput.value) {
			setMessage(<FormattedMessage defaultMessage="Please input a seat number." />);
			seatInput.focus();
			return;
		}

		const seat = parseInt(seatInput.value, 10);
		if (Number.isNaN(seat) || seat <= 0) {
			setMessage(<FormattedMessage defaultMessage="Please input a valid number." />);
			seatInput.value = '';
			seatInput.focus();
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
		onChange?.(player);
	}

	return (
		<div className="role-viewer button-area">
			<input
				type="number"
				inputMode="decimal"
				placeholder={intl.formatMessage(descriptor.seatNumber)}
				aria-label={intl.formatMessage(descriptor.seatNumber)}
				ref={seatNumber}
			/>
			<button type="button" onClick={handleSubmit}>
				{intl.formatMessage(descriptor.viewYourRole)}
			</button>
			<div className="inline-message">
				{message}
			</div>
		</div>
	);
}
