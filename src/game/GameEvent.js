
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

	// 夜晚
	Evening: new GameEvent('Evening'),
	// 夜间
	Night: new GameEvent('Night'),
	// 天亮前
	Dawn: new GameEvent('Dawn'),

	// 早晨
	Morning: new GameEvent('Morning'),
	// 白天
	Day: new GameEvent('Day'),
	// 天黑前
	Dusk: new GameEvent('Dusk'),

	// 死亡前
	Killed: new GameEvent('Killed'),
	// 死亡时
	Death: new GameEvent('Death'),
};
