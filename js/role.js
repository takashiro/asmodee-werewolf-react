
const RoleName = {
	Unknown: '未知',

	// Team Villager
	Villager: '村民',
	Seer: '预言家',
	Tamer: '驯熊师',
	Witch: '女巫',
	Hunter: '猎人',
	Guard: '守卫',
	Magician: '魔术师',
	Idiot: '白痴',
	Elder: '长老',
	Knight: '骑士',
	Dementor: '摄梦者',
	Rogue: '老流氓',

	// Team Werewolf
	Werewolf: '狼人',
	WolfKing: '狼王',
	WhiteWolfKing: '白狼王',
	WolfBeauty: '狼美人',
	SecretWolf: '隐狼',

	// Others
	Jupiter: '丘比特',
	FeralChild: '野孩子',
	Thief: '盗贼',
	Bombman: '炸弹人',

	MaxLimit : ''
};

const Role = DeclareEnum.apply(this, Object.keys(RoleName));

(()=>{
	let num2str = {};
	let num2name = {};

	for (let role in Role) {
		let name = RoleName[role];
		let str = role.toLowerCase();
		let num = Role[role];
		num2str[num] = str;
		num2name[num] = name;
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

