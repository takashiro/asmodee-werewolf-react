
DeclareModule('page/enter-room', () => {
	ShowMessage('');

	// Read session information
	let session = $room.readSession();

	// Clear web page
	let root = $('#root');
	root.html('');

	// Display room number
	let room_info = $('<div class="inline-message"></div>');
	room_info.html(`房间号 ${$room.id}`);
	root.append(room_info);

	// Add functions to create role table
	function create_icon(role){
		let li = $('<li></li>');
		li.data('role-id', role.toNum());
		let icon = role.toImage();
		li.append(icon);
		let name = $('<span class="name"></span>');
		name.text(role.name);
		li.append(name);
		return li;
	}

	function create_role_list(roles) {
		let list = $('<ul class="role-list"></ul>');
		for (let role of roles) {
			list.append(create_icon(role));
		}
		return list;
	}

	// Display role table
	let role_table = $('<div class="role-table"></div>');
	let teams = [
		[Team.Werewolf, Role.Werewolf],
		[Team.Villager, Role.Villager],
		[Team.Other]
	];
	for (let team of teams) {
		let team_box = $('<div class="box"></div>');

		let title = $('<h3></h3>');
		title.html(team[0].name);
		team_box.append(title);

		let basic_roles = $room.roles.filter(role => role == team[1]);
		let special_roles = $room.roles.filter(role => role.team == team[0] && role != team[1]);

		if (basic_roles.length < 4 && special_roles.length < 4) {
			// Display all roles in the same line
			basic_roles.push(...special_roles);
			if (basic_roles.length <= 0) {
				continue;
			}
			team_box.append(create_role_list(basic_roles));
		} else {
			// Split normal roles and special roles
			if (basic_roles.length > 0) {
				team_box.append(create_role_list(basic_roles));
			}
			if (special_roles.length > 0) {
				team_box.append(create_role_list(special_roles));
			}
		}
		role_table.append(team_box);
	}
	root.append(role_table);

	if (!session || !session.ownerKey) {
		// Display UI to fetch a role card
		let my_role_box = $('<div class="box"><h3>你的身份</h3></div>');
		let my_role = $('<div id="my-role" class="role-area"></div>');
		my_role_box.append(my_role);
		root.append(my_role_box);

		my_role.on('update-role', () => {
			if ($user.role && $user.role != Role.Unknown) {
				let name = $user.role.name;
				let name_box = `<div class="name">${name}</div>`;
				my_role.html(name_box + $user.role.toImage());

				if ($user.cards) {
					let ul = $('<ul class="role-list extra-cards"></ul>');
					for (let role of $user.cards) {
						if (role) {
							let icon = create_icon(role);
							ul.append(icon);
						}
					}
					my_role.append(ul);
				}

				$room.writeSession({
					role: $user.role.toNum(),
					cards: $user.cards.map(card => card.toNum())
				});
			} else {
				my_role.html('该房间人数已满。');
			}
		});

		if (!session) {
			// Pure new user. Add input and buttons.
			const ERROR_MESSAGE = {
				ROOM_EXPIRED: '房间不存在，可能已过期。',
				INVALID_SEAT: '座位号错误，请重新输入。',
				SEAT_TAKEN: '该座位已使用，请重新输入。',
				ROOM_FULL: '房间人数已满。'
			};

			let role_area = $('<div class="button-area"></div>');
			let input = $('<input type="number" placeholder="座位号">');
			role_area.append(input);

			let fetch_role_button = $('<button type="button"></button>');
			fetch_role_button.html('查看身份');
			role_area.append(fetch_role_button);

			let fetch_message = $('<div class="inline-message"></div>');
			role_area.append(fetch_message);

			fetch_role_button.click(() => {
				fetch_message.html('你的身份是...');
				$client.request(net.FetchRole, {id: $room.id, seat: input.val()}, result => {
					if (result.error) {
						result = ERROR_MESSAGE[result.error] ? ERROR_MESSAGE[result.error] : result.error;
						fetch_message.html(result);
						return;
					}

					$user.role = Role.fromNum(result.role);
					$user.cards = [];
					if (result.cards && result.cards instanceof Array) {
						$user.cards = result.cards.map(card => Role.fromNum(card));
					}
					my_role.trigger('update-role');
				});
			});

			my_role.append(role_area);
		} else if (session.role) {
			// Display role cards from session
			$user.role = Role.fromNum(session.role);
			$user.cards = [];
			if (session.cards && session.cards instanceof Array) {
				$user.cards = session.cards.map(card => Role.fromNum(card));
			}
			$('#my-role').trigger('update-role');
		}
	}

	let current_site_url = () => {
		let match = location.href.match(/^\w+\:\/\/[^/]+\/(?:compat\/)?/i);
		if (match && match[0]) {
			return match[0];
		} else {
			return '';
		}
	};

	let share_link_area = $('<div class="box share-link-area"></div>');
	let share_label = $('<span class="label"></span>');
	share_label.html('邀请链接');
	share_link_area.append(share_label);
	let share_url = current_site_url() + '?room_id=' + $room.id;
	let link_anchor = $('<a></a>');
	link_anchor.prop('href', share_url);
	link_anchor.html(share_url);
	share_link_area.append(link_anchor);
	root.append(share_link_area);

	link_anchor.click(e => {
		e.preventDefault();

		let link_input = $('<input type="text">');
		link_input.val(share_url);
		link_input.prop('contentEditable', true);
		link_input.prop('readonly', false);

		link_anchor.html('');
		link_anchor.append(link_input);

		link_input.focus();
		link_input.select();
		let range = document.createRange();
		range.selectNodeContents(link_input.get(0));
		let selection = window.getSelection();
		selection.removeAllRanges();
		selection.addRange(range);
		link_input.get(0).setSelectionRange(0, link_input.val().length);
		let result = document.execCommand('copy');

		link_input.prop('readonly', true);
		link_anchor.html(share_url);

		if (result) {
			MakeToast('成功复制该链接。');
		} else {
			MakeToast('复制失败。请手动长按该链接，然后分享给好友。');
		}
	});

	let button_area = $('<div class="button-area"></div>');

	if (session && session.ownerKey) {
		let god_note_button = $('<button type="button"></button>');
		god_note_button.html('上帝助手');
		button_area.append(god_note_button);
		god_note_button.click(() => {
			LoadPage('open-god-note');
		});
	}

	let return_button = $('<button type="button"></button>');
	return_button.html('返回');
	button_area.append(return_button);
	return_button.click(() => {
		button_area.html('加载中...');
		LoadPage('enter-lobby');
	});

	root.append(button_area);
});
