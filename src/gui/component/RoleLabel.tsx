import React from 'react';
import { Role } from '@asmodee/werewolf-core';

const roleNames: string[] = [
	'未知',
	'狼人',
	'狼王',
	'白狼王',
	'狼美人',
	'隐狼',
	'恶灵骑士',
	'村民',
	'预言家',
	'驯兽师',
	'女巫',
	'猎人',
	'守卫',
	'魔术师',
	'白痴',
	'长老',
	'骑士',
	'摄梦人',
	'老流氓',
	'乌鸦',
	'丘比特',
	'野孩子',
	'盗贼',
	'炸弹人',
	'石像鬼',
	'守墓人',
	'天狗',
	'月女',
	'狼外婆',
	'小红帽',
	'影子',
	'复仇者',
	'混血儿',
	'血月使徒',
	'猎魔人',
	'梦魇',
	'暗恋者',
	'奇迹商人',
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
