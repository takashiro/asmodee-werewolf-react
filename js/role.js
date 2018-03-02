
const Team = (() => {

	let TeamValue = 0;

	class Team {

		constructor(key, name) {
			this.value = TeamValue++;
			this.key = key;
			this.name = name;
		}

		toNum() {
			return this.value;
		}

	}

	let TeamList = [
		new Team('Unknown', '未知阵营'),
		new Team('Werewolf', '狼人阵营'),
		new Team('Villager', '神民阵营'),
		new Team('Other', '其他角色')
	];

	for (let team of TeamList) {
		Team[team.key] = team;
	}

	return Team;
})();

const Role = (() => {

	let RoleValue = 0;

	class Role {

		constructor(key, name, team = Team.Unkown) {
			this.value = RoleValue++;
			this.key = key;
			this.name = name;
			this.team = team;
		}

		toImage() {
			let role = this.key.toLowerCase();
			return `<div class="role" style="background-image: url(style/role/${role}.jpg)"></div>`;
		};

		toNum() {
			return this.value;
		}

	}

	const RoleList = [
		new Role('Unknown', '未知'),

		// Team Werewolf
		new Role('Werewolf', '狼人', Team.Werewolf),
		new Role('AlphaWolf', '狼王', Team.Werewolf),
		new Role('WhiteAlphaWolf', '白狼王', Team.Werewolf),
		new Role('WolfBeauty', '狼美人', Team.Werewolf),
		new Role('SecretWolf', '隐狼', Team.Werewolf),
		new Role('Demon', '恶灵', Team.Werewolf),

		// Team Villager
		new Role('Villager', '村民', Team.Villager),
		new Role('Seer', '预言家', Team.Villager),
		new Role('Tamer', '驯熊师', Team.Villager),
		new Role('Witch', '女巫', Team.Villager),
		new Role('Hunter', '猎人', Team.Villager),
		new Role('Guard', '守卫', Team.Villager),
		new Role('Magician', '魔术师', Team.Villager),
		new Role('Idiot', '白痴', Team.Villager),
		new Role('Elder', '长老', Team.Villager),
		new Role('Knight', '骑士', Team.Villager),
		new Role('Dementor', '摄梦人', Team.Villager),
		new Role('Rogue', '老流氓', Team.Villager),
		new Role('Crow', '乌鸦', Team.Villager),

		// Others
		new Role('Cupid', '丘比特', Team.Other),
		new Role('FeralChild', '野孩子', Team.Other),
		new Role('Thief', '盗贼', Team.Other),
		new Role('Bombman', '炸弹人', Team.Other)
	];
	Role.List = RoleList;

	/**
	 * Convert number into Role
	 * @param {number} num
	 */
	Role.fromNum = num => {
		if (num >= 0 && num < RoleList.length) {
			return RoleList[num];
		} else {
			return RoleList[0];
		}
	};

	for (let role of RoleList) {
		Role[role.key] = role;
	}

	return Role;
})();
