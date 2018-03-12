
let EventId = 0;

class GameEvent {

	constructor(key) {
		this.id = EventId++;
		this.key = key;
	}

}

export default {
	Invalid: new GameEvent('Invalid'),
	// 游戏开始时
	Start: new GameEvent('Start'),
	// 夜间
	Night: new GameEvent('Night'),
	// 天亮前
	Dawn: new GameEvent('Dawn'),
	// 白天
	Day: new GameEvent('Day'),
	// 公投前
	BeforeExecution: new GameEvent('BeforeExecution'),
	// 死亡时
	Death: new GameEvent('Death')
};
