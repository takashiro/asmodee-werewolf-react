import React from 'react';
import { MessageDescriptor, defineMessage, useIntl } from 'react-intl';
import { Role } from '@asmodee/werewolf-core';

export const roleNames: MessageDescriptor[] = [
	defineMessage({ defaultMessage: 'Unknown' }),
	defineMessage({ defaultMessage: 'Werewolf' }),
	defineMessage({ defaultMessage: 'Alpha Wolf' }),
	defineMessage({ defaultMessage: 'White Alpha Wolf' }),
	defineMessage({ defaultMessage: 'Wolf Beauty' }),
	defineMessage({ defaultMessage: 'Secret Wolf' }),
	defineMessage({ defaultMessage: 'Demon' }),
	defineMessage({ defaultMessage: 'Villager' }),
	defineMessage({ defaultMessage: 'Seer' }),
	defineMessage({ defaultMessage: 'Tamer' }),
	defineMessage({ defaultMessage: 'Witch' }),
	defineMessage({ defaultMessage: 'Hunter' }),
	defineMessage({ defaultMessage: 'Guard' }),
	defineMessage({ defaultMessage: 'Magician' }),
	defineMessage({ defaultMessage: 'Idiot' }),
	defineMessage({ defaultMessage: 'Elder' }),
	defineMessage({ defaultMessage: 'Knight' }),
	defineMessage({ defaultMessage: 'Dream Weaver' }),
	defineMessage({ defaultMessage: 'Rogue' }),
	defineMessage({ defaultMessage: 'Crow' }),
	defineMessage({ defaultMessage: 'Cupid' }),
	defineMessage({ defaultMessage: 'Feral Child' }),
	defineMessage({ defaultMessage: 'Thief' }),
	defineMessage({ defaultMessage: 'Bombman' }),
	defineMessage({ defaultMessage: 'Gargoyle' }),
	defineMessage({ defaultMessage: 'Graveyard Keeper' }),
	defineMessage({ defaultMessage: 'Tengu' }),
	defineMessage({ defaultMessage: 'Luna' }),
	defineMessage({ defaultMessage: 'Wolf Grandma' }),
	defineMessage({ defaultMessage: 'Red Hat' }),
	defineMessage({ defaultMessage: 'Doppelganger' }),
	defineMessage({ defaultMessage: 'Revenger' }),
	defineMessage({ defaultMessage: 'Hybrid' }),
	defineMessage({ defaultMessage: 'Lunar Apostle' }),
	defineMessage({ defaultMessage: 'Mara Hunter' }),
	defineMessage({ defaultMessage: 'Nightmare' }),
	defineMessage({ defaultMessage: 'Scarlett' }),
	defineMessage({ defaultMessage: 'Miracle Merchant' }),
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
	const intl = useIntl();
	const name = intl.formatMessage(roleNames[role]);
	return (
		<span className={className}>{name}</span>
	);
}
