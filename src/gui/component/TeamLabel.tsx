import React from 'react';
import { Team } from '@asmodee/werewolf-core';

const teamNames: string[] = [
	'未知',
	'狼人阵营',
	'神民阵营',
	'其他角色',
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
