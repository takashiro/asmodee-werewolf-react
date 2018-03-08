
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

Team.fromNum = num => {
	if (num >= 0 && num < TeamList.length) {
		return TeamList[num];
	} else {
		return Team.Unknown;
	}
};

Team.List = TeamList;

export default Team;
