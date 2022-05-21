import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Team } from '@asmodee/werewolf-core';

const teamNames: React.ReactNode[] = [
	<FormattedMessage defaultMessage="Team Unknown" />,
	<FormattedMessage defaultMessage="Team Werewolf" />,
	<FormattedMessage defaultMessage="Team Villager" />,
	<FormattedMessage defaultMessage="Team Other" />,
];

interface Props {
	team: Team;
	className?: string;
}

export default function TeamLabel(props: Props): JSX.Element {
	const {
		team,
		className = 'team-name',
	} = props;
	const name = teamNames[team];
	return (
		<span className={className}>{name}</span>
	);
}
