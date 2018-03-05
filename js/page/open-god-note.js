
DeclareModule('page/open-god-note', () => {
	ShowMessage('');

	// Clear page
	let root = $('#root');
	root.html('');

	// Load extra CSS rules
	let style = $('<style></style>');
	style.html('@import url(style/god-note.css);');
	root.append(style);

	// Global variables
	let $day = 1;
	let $note_action = null;
	const $players = [];

	// Define all markers
	const Marker = (() => {
		let id = 0;
		class Marker {
			constructor(key, name, temporary = true) {
				this.id = id++;
				this.key = key;
				this.name = name;
				this.temporary = temporary;
			}
		}

		const list = [
			new Marker('Thief', '盗贼', false),
			new Marker('Couple', '情侣', false),
			new Marker('RoleModel', '榜样', false),

			new Marker('Exchanged', '交换'),

			new Marker('Killed', '狼刀'),
			new Marker('Charmed', '魅惑'),
			new Marker('Reflected', '反伤'),
			new Marker('Saved', '解救'),
			new Marker('Poisoned', '毒杀'),
			new Marker('Guarded', '守护'),
			new Marker('Demented', '摄梦'),
			new Marker('Muted', '禁言'),
			new Marker('Cursed', '诅咒'),

			new Marker('DieForLove', '殉情', false),
			new Marker('Struggling', '强撑', false),

			new Marker('Shot', '枪杀', false),
			new Marker('Duel', '决斗', false),
			new Marker('Executed', '公投', false),
		];

		for (let marker of list) {
			Marker[marker.key] = marker;
		}
		return Marker;
	})();

	class Player {

		constructor(seat, node) {
			this.node = {
				icon: node.children('.icon'),
				markers: node.children('ul.marker')
			};

			this.seat = seat;
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

		get killed() {
			return this.deathDay == $day;
		}

		saveLife() {
			this.node.icon.removeClass('dead');
			this.deathDay = 0;
		}

		endLife() {
			this.deathDay = $day;
			this.node.icon.addClass('dead');
		}

		addMarker(marker) {
			let li = $('<li></li>');
			li.html(marker.name);
			this.node.markers.append(li);
			this.markers.set(marker, li);
		}

		removeMarker(marker) {
			let li = this.markers.get(marker);
			if (li) {
				li.remove();
			}
			this.markers.delete(marker);
		}

		toggleMarker(marker) {
			if (this.hasMarker(marker)) {
				this.removeMarker(marker);
			} else {
				this.addMarker(marker);
			}
		}

		clearMarkers(all = false) {
			if (all) {
				this.markers.forEach(node => {
					node.remove();
				});
				this.markers.clear();
			} else {
				let to_remove = [];
				this.markers.forEach((node, marker) => {
					if (marker.temporary) {
						to_remove.push(marker);
					}
				});
				for (let marker of to_remove) {
					this.removeMarker(marker);
				}
			}
		}

		hasMarker(marker) {
			return this.markers.has(marker);
		}

	};

	class RolePrompt {
		constructor(role, repeat = true, marker = null, extra_action = null) {
			this.role = role;
			this.repeat = repeat;
			this.actions = [];

			if (marker) {
				let markers = marker instanceof Array ? marker : [marker];
				markers.forEach(marker => {
					let func = () => {
						$note_action = player => {
							player.toggleMarker(marker);
						};
					};

					this.actions.push({
						name: marker.name,
						func: func
					})
				});
			}

			if (extra_action) {
				this.actions.push(...extra_action);
			}
		}
	};

	const PromptList = (() => {
		let prompt_list = [
			new RolePrompt(Role.Thief, false),
			new RolePrompt(Role.Cupid, false, Marker.Couple),
			new RolePrompt(Role.FeralChild, false, Marker.RoleModel),
			new RolePrompt(Role.Bombman, false),
			new RolePrompt(Role.Tamer, false),
			new RolePrompt(Role.Idiot, false),
			new RolePrompt(Role.Knight, false),
			new RolePrompt(Role.Rogue, false),
			new RolePrompt(Role.WhiteAlphaWolf, false),
			new RolePrompt(Role.SecretWolf, false),

			new RolePrompt(Role.Magician, true, Marker.Exchanged),
			new RolePrompt(Role.Werewolf, true, Marker.Killed),
			new RolePrompt(Role.WolfBeauty, true, Marker.Charmed),
			new RolePrompt(Role.Seer),
			new RolePrompt(Role.Witch, true, null, [
				{
					name: '解救',
					func: () => {
						for (let player of $players) {
							if (player.hasMarker(Marker.Killed)) {
								player.toggleMarker(Marker.Saved);
								break;
							}
						}
					}
				}
			]),
			new RolePrompt(Role.Witch, true, Marker.Poisoned),
			new RolePrompt(Role.Guard, true, Marker.Guarded),
			new RolePrompt(Role.Dementor, true, Marker.Demented),
			new RolePrompt(Role.Elder, true, Marker.Muted),
			new RolePrompt(Role.Crow, true, Marker.Cursed),
			new RolePrompt(Role.AlphaWolf),
			new RolePrompt(Role.Hunter),
			new RolePrompt(Role.Demon),

			new RolePrompt(Role.Villager, false, null, [
				{
					name: '补齐',
					func: () => {
						for (let player of $players) {
							if (player.role == Role.Unknown) {
								player.role = Role.Villager;
							}
						}
					}
				}
			])
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

	// Display players
	let player_round_left = $('<ul class="player-round left"></ul>');
	let player_round_right = $('<ul class="player-round right"></ul>');
	(() => {
		function create_player(i) {
			let li = $('<li></li>');
			li.data('seat', i);

			let seat = i + 1;
			let num = $('<div class="number"></div>');
			num.html(seat);
			li.append(num);

			let icon = $('<div class="icon"></div>');
			li.append(icon);

			let markers = $('<ul class="marker"></ul>');
			li.append(markers);

			$players.push(new Player(seat, li));
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
		if (isNaN(seat) || seat < 0 || seat >= $players.length) {
			return;
		}

		let player = $players[seat];
		$note_action && $note_action(player);
	});

	// Display game flow
	let flow = $('<ol class="game-flow"></ol>');
	root.append(flow);

	// Click one phase to set player role
	flow.on('click', 'ol.action > li h5', function () {
		let li = $(this).parent();
		let role = Role.fromNum(li.data('role-id'));
		$note_action = player => {
			if (player.role != role) {
				if (player.role == Role.Thief) {
					player.addMarker(Marker.Thief);
				}
				player.role = role;
			} else {
				player.role = Role.Unknown;
			}
		};
	});

	flow.on('click', 'ol.action > li', function () {
		let li = $(this);
		flow.find('ol.action > li.current').removeClass('current');
		li.addClass('current');
	});

	// Fetch and display all roles
	function refresh_all_roles() {
		for (let player of $players) {
			player.role = Role.Unknown;
			delete player.cards;
			player.clearMarkers(true);
		}
		$client.request(net.FetchRoles, {id: $room.id, ownerKey: session.ownerKey}, result => {
			if (typeof result == 'string') {
				MakeToast(result);
				return;
			}

			if (!(result instanceof Array)) {
				MakeToast('房间已失效，无法刷新。');
				return;
			}

			for (let record of result) {
				let i = record.seat - 1;
				if (i >= 0 && i < $players.length) {
					let player = $players[i];
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


	// Define role effects
	const RoleEffect = (() => {
		// Trigger on dawn
		let on_dawn = [];

		// Trigger on each player
		let on_death = [];

		//Cupid
		on_death.push(function () {
			if (!this.alive && this.hasMarker(Marker.Couple)) {
				for (let player of $players) {
					if (player != this && player.hasMarker(Marker.Couple)) {
						player.endLife();
					}
				}
			}
		});

		//Magician
		on_dawn.push(function () {
			let exchanged = $players.filter(player => player.hasMarker(Marker.Exchanged));
			if (exchanged.length != 2) {
				return;
			}

			let marker0 = [];
			exchanged[0].markers.forEach((node, marker) => {
				if (marker.temporary) {
					marker0.push(marker);
				}
			});

			let marker1 = [];
			exchanged[1].markers.forEach((node, marker) => {
				if (marker.temporary) {
					marker1.push(marker);
				}
			});

			exchanged[0].clearMarkers();
			for (let marker of marker1) {
				exchanged[0].addMarker(marker);
			}

			exchanged[1].clearMarkers();
			for (let marker of marker0) {
				exchanged[1].addMarker(marker);
			}
		});

		//Werewolf
		on_dawn.push(function () {
			for (let player of $players) {
				if (player.hasMarker(Marker.Killed)) {
					player.endLife();
				}
			}
		});

		// Wolf Beauty
		on_death.push(function () {
			if (this.role == Role.WolfBeauty && !this.hasMarker(Marker.Poisoned)) {
				for (let player of $players) {
					if (player.hasMarker(Marker.Charmed)) {
						player.endLife();
					}
				}
			}
		});

		// Demon
		on_death.push(function (daylight) {
			if (!daylight && this.role == Role.Demon) {
				this.saveLife();
				return true;
			}
		});

		// Witch
		on_dawn.push(function () {
			for (let player of $players) {
				if (player.hasMarker(Marker.Saved)) {
					if (player.hasMarker(Marker.Killed) && !player.hasMarker(Marker.Guarded)) {
						player.saveLife();
					}
				} else if (player.hasMarker(Marker.Poisoned)) {
					player.endLife();
				}
			}
		});

		// Guard
		on_dawn.push(function () {
			for (let player of $players) {
				if (player.hasMarker(Marker.Guarded) && player.hasMarker(Marker.Killed)) {
					if (!player.hasMarker(Marker.Saved)) {
						player.saveLife();
					}
				}
			}
		});

		// Dementor
		on_dawn.push(function () {
			for (let player of $players) {
				if (!player.hasMarker(Marker.Demented)) {
					continue;
				}

				if (player.demented === $day - 1) {
					player.endLife();
				} else if (!player.alive) {
					player.saveLife();
				}
				player.demented = $day;
			}
		});
		on_death.push(function (daylight) {
			if (daylight) {
				return false;
			}

			if (this.hasMarker(Marker.Demented)) {
				this.saveLife();
				return true;
			}
		});

		return {
			onDawn: function () {
				for (let callback of on_dawn) {
					callback.call(this);
				}
			},
			onDeath: function (daylight) {
				for (let player of $players) {
					for (let callback of on_death) {
						if (callback.call(player, daylight)) {
							return true;
						}
					}
				}
				return false;
			}
		};
	})();

	// Display game flow for each day
	function create_day() {
		let li = $('<li></li>');

		// Dusk
		let h4 = $('<h4></h4>');
		h4.html(`第 ${$day} 天`);
		li.append(h4);

		// Night
		let action_list = $('<ol class="action"></ol>');
		li.append(action_list);
		for (let prompt of PromptList) {
			if ($day > 1 && !prompt.repeat) {
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
			for (let action of prompt.actions) {
				let button = $('<button type="button"></button>');
				button.html(action.name);
				button.click(action.func);
				content.append(button);
			}
			item.append(content);

			action_list.append(item);
		}

		// Morning
		let morning_button = $('<button type="button"></button>');
		morning_button.html('天亮了');
		li.append(morning_button);
		morning_button.click(e => {
			action_list.hide();
			morning_button.hide();

			// Display death message
			let death_message = $('<div class="day-message"><h3>夜间信息</h3></div>');
			(box => {
				RoleEffect.onDawn();
				for (let player of $players) {
					if (player.killed) {
						RoleEffect.onDeath(false);
					}
				}

				let messages = [];

				let defuncts = $players.filter(player => player.killed);
				if (defuncts.length <= 0) {
					messages.push('平安夜');
				} else {
					let message = '昨晚倒牌 ' + defuncts.map(defunct => defunct.seat).join(', ');
					messages.push(message);
				}

				for (let message of messages) {
					let p = $('<p></p>');
					p.html(message);
					box.append(p);
				}
				flow.append(box);
			})(death_message);

			// Display vote message
			let vote_message = $('<div class="day-message"><h3>公投信息</h3></div>');
			(box => {
				let messages = [];

				// TODO:

				for (let message of messages) {
					let p = $('<p></p>');
					p.html(message);
					box.append(p);
				}

				if (messages.length > 0) {
					flow.append(box);
				}
			})(vote_message);

			// Mark executed user
			$note_action = player => {
				player.toggleMarker(Marker.Executed);
			};

			// Display execute button
			let button_area = $('<div class="button-area"></div>');

			let execute_button = $('<button type="button"></button>');
			execute_button.html('确认公投');
			execute_button.click(e => {
				for (let player of $players) {
					if (player.hasMarker(Marker.Executed)) {
						player.endLife();
					}
				}
				RoleEffect.onDeath(true);

				for (let player of $players) {
					player.clearMarkers();
				}

				execute_button.hide();
				create_day();
			});
			button_area.append(execute_button);

			flow.append(button_area);
		});

		flow.append(li);

		$day++;
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
