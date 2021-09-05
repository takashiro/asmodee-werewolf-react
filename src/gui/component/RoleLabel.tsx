import React from 'react';
import { Role } from '@asmodee/werewolf-core';
import { FormattedMessage } from 'react-intl';

const roleNames: React.ReactNode[] = [
	<FormattedMessage defaultMessage="Unknown" />,
	<FormattedMessage defaultMessage="Werewolf" />,
	<FormattedMessage defaultMessage="Alpha Wolf" />,
	<FormattedMessage defaultMessage="White Alpha Wolf" />,
	<FormattedMessage defaultMessage="Wolf Beauty" />,
	<FormattedMessage defaultMessage="Secret Wolf" />,
	<FormattedMessage defaultMessage="Demon" />,
	<FormattedMessage defaultMessage="Villager" />,
	<FormattedMessage defaultMessage="Seer" />,
	<FormattedMessage defaultMessage="Tamer" />,
	<FormattedMessage defaultMessage="Witch" />,
	<FormattedMessage defaultMessage="Hunter" />,
	<FormattedMessage defaultMessage="Guard" />,
	<FormattedMessage defaultMessage="Magician" />,
	<FormattedMessage defaultMessage="Idiot" />,
	<FormattedMessage defaultMessage="Elder" />,
	<FormattedMessage defaultMessage="Knight" />,
	<FormattedMessage defaultMessage="Dream Weaver" />,
	<FormattedMessage defaultMessage="Rogue" />,
	<FormattedMessage defaultMessage="Crow" />,
	<FormattedMessage defaultMessage="Cupid" />,
	<FormattedMessage defaultMessage="Feral Child" />,
	<FormattedMessage defaultMessage="Thief" />,
	<FormattedMessage defaultMessage="Bombman" />,
	<FormattedMessage defaultMessage="Gargoyle" />,
	<FormattedMessage defaultMessage="Graveyard Keeper" />,
	<FormattedMessage defaultMessage="Tengu" />,
	<FormattedMessage defaultMessage="Luna" />,
	<FormattedMessage defaultMessage="Wolf Grandma" />,
	<FormattedMessage defaultMessage="Red Hat" />,
	<FormattedMessage defaultMessage="Doppelganger" />,
	<FormattedMessage defaultMessage="Revenger" />,
	<FormattedMessage defaultMessage="Hybrid" />,
	<FormattedMessage defaultMessage="Lunar Apostle" />,
	<FormattedMessage defaultMessage="Mara Hunter" />,
	<FormattedMessage defaultMessage="Nightmare" />,
	<FormattedMessage defaultMessage="Scarlett" />,
	<FormattedMessage defaultMessage="Miracle Merchant" />,
];

interface Props {
	role: Role;
	className?: string;
}

export default function RoleLabel(props: Props): JSX.Element {
	const {
		role,
		className = 'role-name',
	} = props;
	const name = roleNames[role];
	return (
		<span className={className}>{name}</span>
	);
}
