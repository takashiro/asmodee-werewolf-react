
DeclareModule('page/open-god-note', () => {
	ShowMessage('');

	let root = $('#root');
	root.html('');

	let style = $('<style></style>');
	style.html('@import url(style/god-note.css);');
	root.append(style);

	const Marker = (() => {
		let id = 0;
		class Marker {
			constructor(key, name) {
				this.id = id++;
				this.key = key;
				this.name = name;
			}
		}

		const list = [
			new Marker('Lover', '情侣'),
			new Marker('Thief', '盗贼'),

			new Marker('Killed', '狼刀'),
			new Marker('Reflected', '反伤'),
			new Marker('Executed', '公投'),
			new Marker('Poisoned', '毒杀'),
			new Marker('Shot', '枪杀'),
			new Marker('Guarded', '守护'),
			new Marker('Exchanged', '交换'),
			new Marker('Muted', '禁言'),
			new Marker('Duel', '决斗'),
			new Marker('Demented', '摄梦'),
			new Marker('Struggling', '强撑'),
			new Marker('Cursed', '诅咒'),
			new Marker('DieForLove', '殉情')
		];

		for (let marker of list) {
			Marker[marker.key] = marker;
		}
		return Marker;
	})();

	class Player {

		constructor(node) {
			this.node = {
				icon: node.children('.icon'),
				markers: node.children('ul.marker')
			};
			this.deathDay = 0;
			this.markers = new Map;

			this._role = 0;
		}

		set role(role) {
			if (this.role === role) {
				return;
			}

			this._role = role;

			if (role && role != Role.Unknown) {
				this.node.icon.html(role.toImage());
			} else {
				this.node.icon.html('');
			}
		}

		get role() {
			return this._role;
		}

		get alive() {
			return this.deathDay <= 0;
		}

		addMark(marker) {
			let li = $('<li></li>');
			li.html(marker.name);
			this.node.markers.append(li);
			this.markers.set(marker, li);
		}

		removeMark(marker) {
			let li = this.markers.get(marker);
			if (li) {
				li.remove();
			}
			this.markers.delete(marker);
		}

		clearMarkers() {
			this.markers.forEach(node => {
				node.remove();
			});
			this.markers.clear();
		}

		hasMark(marker) {
			return this.markers.has(marker);
		}

	};

	class RolePrompt {
		constructor(role, repeat = true, action = null) {
			this.role = role;
			this.repeat = repeat;
			this.action = action;
		}
	};

	const PromptList = (() => {
		let prompt_list = [
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
		for (let prompt of prompt_list) {
			if ($room.roles.indexOf(prompt.role) >= 0) {
				prompts.push(prompt);
			}
		}
		return prompts;
	})();

	// Calculate player number
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

	// Display players
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

			let markers = $('<ul class="marker"></ul>');
			li.append(markers);

			players.push(new Player(li));
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

	// Click one role to take $note_action
	$('.player-round').on('click', 'li', function () {
		let li = $(this);
		let seat = parseInt(li.data('seat'), 10);
		if (isNaN(seat) || seat < 0 || seat >= players.length) {
			return;
		}

		let player = players[seat];
		$note_action && $note_action(player);
	});

	// Display game flow
	let flow = $('<ol class="game-flow"></ol>');
	root.append(flow);

	// Click one phase to set player role
	flow.on('click', 'ol.action > li', function () {
		let li = $(this);
		let role = Role.fromNum(li.data('role-id'));
		$note_action = player => {
			if (player.role != role) {
				if (player.role == Role.Thief) {
					player.addMark(Marker.Thief);
				}
				player.role = role;
			} else {
				player.role = Role.Unknown;
			}
		};

		flow.find('ol.action > li.current').removeClass('current');
		li.addClass('current');
	});

	// Fetch and display all roles
	function refresh_all_roles() {
		for (let player of players) {
			player.role = Role.Unknown;
			delete player.cards;
			player.clearMarkers();
		}
		$client.request(net.FetchRoles, {id: $room.id, ownerKey: session.ownerKey}, result => {
			if (typeof result == 'string') {
				MakeToast(result);
				return;
			}

			for (let record of result) {
				let i = record.seat - 1;
				if (i >= 0 && i < players.length) {
					let player = players[i];
					if (record.card) {
						let card = record.card;
						if (card.role) {
							player.role = Role.fromNum(card.role);
						}
						if (card.cards) {
							player.cards = card.cards.map(role => Role.fromNum(role));
						}
					}
				}
			}
		});
	}

	// Check if it's opened by room owner
	let session = $room.readSession();
	if (session && session.ownerKey) {
		refresh_all_roles();
	}

	// Display game flow for each day
	let day = 1;
	function create_day() {
		let li = $('<li></li>');

		let h4 = $('<h4></h4>');
		h4.html(`第 ${day} 天`);
		li.append(h4);

		let action_list = $('<ol class="action"></ol>');
		li.append(action_list);

		for (let prompt of PromptList) {
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

	// Display button area
	let button_area = $('<div class="button-area"></div>');

	let refresh_button = $('<button type="button"></button>');
	refresh_button.html('刷新');
	refresh_button.click(refresh_all_roles);
	button_area.append(refresh_button);

	let return_button = $('<button type="button"></button>');
	return_button.html('返回');
	return_button.click(e => {
		LoadPage('enter-room');
	});
	button_area.append(return_button);

	root.append(button_area);
});
