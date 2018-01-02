
const Role = DeclareEnum(
	'Unknown',

	// Team Werewolf
	'Werewolf',
	'WolfKing',
	'WhiteWolfKing',
	'WolfBeauty',
	'SecretWolf',
	'Demon',

	// Team Villager
	'Villager',
	'Seer',
	'Tamer',
	'Witch',
	'Hunter',
	'Guard',
	'Magician',
	'Idiot',
	'Elder',
	'Knight',
	'Dementor',
	'Rogue',

	// Others
	'Cupid',
	'FeralChild',
	'Thief',
	'Bombman',

	'MaxLimit'
);

(()=>{
	// Team Werewolf
	let num2name = {};
	num2name[Role.Werewolf] = '狼人';
	num2name[Role.WolfKing] = '狼王';
	num2name[Role.WhiteWolfKing] = '白狼王';
	num2name[Role.WolfBeauty] = '狼美人';
	num2name[Role.SecretWolf] = '隐狼';
	num2name[Role.Demon] = '恶灵';

	// Team Villager
	num2name[Role.Villager] = '村民';
	num2name[Role.Seer] = '预言家';
	num2name[Role.Tamer] = '驯熊师';
	num2name[Role.Witch] = '女巫';
	num2name[Role.Hunter] = '猎人';
	num2name[Role.Guard] = '守卫';
	num2name[Role.Magician] = '魔术师';
	num2name[Role.Idiot] = '白痴';
	num2name[Role.Elder] = '长老';
	num2name[Role.Knight] = '骑士';
	num2name[Role.Dementor] = '摄梦者';
	num2name[Role.Rogue] = '老流氓';

	// Others
	num2name[Role.Cupid] = '丘比特';
	num2name[Role.FeralChild] = '野孩子';
	num2name[Role.Thief] = '盗贼';
	num2name[Role.Bombman] = '炸弹人';

	let num2str = {};
	for (let role in Role) {
		let str = role.toLowerCase();
		let num = Role[role];
		num2str[num] = str;
	}

	Role.convertToString = num => {
		return num2str[num];
	};

	Role.convertToName = num => {
		return num2name[num];
	};

	Role.createImage = role_id => {
		let role = Role.convertToString(role_id);
		return `<div class="role" style="background-image: url(style/role/${role}.jpg)"></div>`;
	};
})();

