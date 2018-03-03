
DeclareModule('page/open-god-note', () => {
	ShowMessage('');

	let root = $('#root');
	root.html('');

	let style = $('<style></style>');
	style.html('@import url(style/god-note.css);');
	root.append(style);

	const DeathReason = (() => {
		let id = 0;
		class DeathReason {
			constructor(key, name) {
				this.id = id++;
				this.key = key;
				this.name = name;
			}
		}

		const list = [
			new DeathReason('Killed', '狼刀'),
			new DeathReason('Executed', '公投'),
			new DeathReason('Poisoned', '毒杀'),
			new DeathReason('Shot', '枪杀'),
			new DeathReason('Love', '殉情'),
			new DeathReason('Demented', '摄梦')
		];

		return DeathReason;
	})();

	class Player {

		constructor(node) {
			this.node = node;
			this.deathDay = 0;
			this.deathReason = null;

			this._role = 0;
		}

		set role(role) {
			if (this.role === role) {
				return;
			}

			this._role = role;

			if (role && role != Role.Unknown) {
				this.node.html(role.toImage());
			} else {
				this.node.html('');
			}
		}

		get role() {
			return this._role;
		}

		get alive() {
			return this.deathDay <= 0;
		}

	};

	class RolePrompt {
		constructor(role, repeat = true, action = null) {
			this.role = role;
			this.repeat = repeat;
			this.action = action;
		}
	};

	const RolePromptList = [
		// First Night Only
		new RolePrompt(Role.Thief, false),
		new RolePrompt(Role.Cupid, false),
		new RolePrompt(Role.FeralChild, false),
		new RolePrompt(Role.Bombman, false),
		new RolePrompt(Role.Tamer, false),
		new RolePrompt(Role.Idiot, false),
		new RolePrompt(Role.Knight, false),
		new RolePrompt(Role.Rogue, false),
		new RolePrompt(Role.WhiteAlphaWolf, false),
		new RolePrompt(Role.SecretWolf, false),

		// Repeated
		new RolePrompt(Role.Magician),
		new RolePrompt(Role.Werewolf),
		new RolePrompt(Role.WolfBeauty),
		new RolePrompt(Role.Seer),
		new RolePrompt(Role.Witch),
		new RolePrompt(Role.Guard),
		new RolePrompt(Role.Dementor),
		new RolePrompt(Role.Elder),
		new RolePrompt(Role.AlphaWolf),
		new RolePrompt(Role.Hunter),
		new RolePrompt(Role.Demon)
	];

	let prompts = [];
	for (let prompt of RolePromptList) {
		if ($room.roles.indexOf(prompt.role) >= 0) {
			prompts.push(prompt);
		}
	}

	let player_num = $room.roles.length;
	$room.roles.forEach(role => {
		if (role == Role.Thief) {
			player_num -= 2;
			if (player_num < 1) {
				player_num == 1;
			}
		}
	});
	let players = [];

	let $note_action = null;

	let player_round_left = $('<ul class="player-round left"></ul>');
	let player_round_right = $('<ul class="player-round right"></ul>');
	(() => {
		function create_player(i) {
			let li = $('<li></li>');
			li.data('seat', i);

			let num = $('<div class="number"></div>');
			num.html(i + 1);
			li.append(num);

			let icon = $('<div class="icon"></div>');
			li.append(icon);

			players.push(new Player(icon));
			return li;
		}

		let i;
		for (i = 0; i < player_num / 2; i++) {
			player_round_right.append(create_player(i));
		}
		for (; i < player_num; i++) {
			player_round_left.append(create_player(i));
		}
	})();
	root.append(player_round_left);
	root.append(player_round_right);

	$('.player-round').on('click', 'li', function () {
		let li = $(this);
		let seat = parseInt(li.data('seat'), 10);
		if (isNaN(seat) || seat < 0 || seat >= players.length) {
			return;
		}

		let player = players[seat];
		$note_action && $note_action(player);
	});

	let flow = $('<ol class="game-flow"></ol>');
	root.append(flow);

	flow.on('click', 'ol.action > li', function () {
		let li = $(this);
		let role = Role.fromNum(li.data('role-id'));
		$note_action = player => {
			if (player.role != role) {
				player.role = role;
			} else {
				player.role = Role.Unknown;
			}
		};

		flow.find('ol.action > li.current').removeClass('current');
		li.addClass('current');
	});

	let day = 1;
	function create_day() {
		let li = $('<li></li>');

		let h4 = $('<h4></h4>');
		h4.html(`第 ${day} 天`);
		li.append(h4);

		let action_list = $('<ol class="action"></ol>');
		li.append(action_list);

		for (let prompt of prompts) {
			if (day > 1 && !prompt.repeat) {
				continue;
			}

			let item = $('<li></li>');
			item.data('role-id', prompt.role.toNum());

			let h5 = $('<h5></h5>');
			h5.html(prompt.role.toImage());
			let name = $('<span class="name"></span>');
			name.html(prompt.role.name);
			h5.append(name);
			item.append(h5);

			let content = $('<div class="content"></div>');
			content.html('点此标记身份');
			item.append(content);

			action_list.append(item);
		}

		flow.append(li);

		day++;
	};
	create_day();
});
