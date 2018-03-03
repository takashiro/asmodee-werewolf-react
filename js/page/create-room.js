
DeclareModule('page/create-room', () => {
	ShowMessage('');

	let root = $('#root');
	root.html('');

	let multi_selector_click = e => {
		let li = $(e.currentTarget);
		li.toggleClass('selected');
	};

	function create_option(role){
		let li = $('<li></li>');
		li.data('role-id', role.toNum());
		li.append(role.toImage());
		let name = $('<span class="name"></span>');
		name.text(role.name);
		li.append(name);
		return li;
	}

	function create_number_input(role){
		let box = $('<div class="role-selector number-selector"></div>');

		let icon = $('<div class="icon"></div>');
		icon.append(role.toImage());
		let name = $('<span class="name"></span>');
		name.text(role.name);
		icon.append(name);
		box.append(icon);

		let number_input = $('<div class="number-input"></div>');
		let decrease = $('<div class="decrease"></div>');
		number_input.append(decrease);
		let input = $('<input type="number"></input>');
		input.data('role-id', role.toNum());
		input.val('0');
		number_input.append(input);
		let increase = $('<div class="increase"></div>');
		number_input.append(increase);

		decrease.click(() => {
			let num = parseInt(input.val(), 10);
			num--;
			if (num >= 0) {
				input.val(num);
			}
		});

		increase.click(() => {
			let num = parseInt(input.val(), 10);
			num++;
			input.val(num);
		});

		box.append(number_input);
		return box;
	}

	function create_role_selector(roles) {
		let selector = $('<ul class="role-selector"></ul>');
		for (let role of roles) {
			selector.append(create_option(role));
		}
		selector.on('click', 'li', multi_selector_click);
		return selector;
	}

	// Construct Teams
	let teams = [
		[Team.Werewolf, Role.Werewolf],
		[Team.Villager, Role.Villager],
		[Team.Other]
	];

	let team_selector = new Map;

	for (let team of teams) {
		let team_box = $('<div class="box"></div>');

		let title = $('<h3></h3>');
		title.html(team[0].name);
		team_box.append(title);

		let selector = {};

		if (team[1]) {
			selector.basic = create_number_input(team[1]);
			team_box.append(selector.basic);
		}

		let roles = Role.List.filter(role => role != team[1] && role.team == team[0]);
		if (roles.length <= 0 && !team[1]) {
			continue;
		}

		selector.extra = create_role_selector(roles);
		team_box.append(selector.extra);

		team_selector.set(team[0], selector);
		root.append(team_box);
	}

	let pref_roles = localStorage.getItem('setting.roles');
	if (pref_roles) {
		try {
			let roles = JSON.parse(pref_roles);
			if (!(roles instanceof Array)) {
				roles = [];
			}

			team_selector.forEach(selector => {
				if (selector.basic) {
					selector.basic.val('0');
				}
			});

			let werewolf_num = 0;
			let villager_num = 0;
			roles.forEach(role => {
				switch (role) {
				case Role.Werewolf.value:
					werewolf_num++;
					break;
				case Role.Villager.value:
					villager_num++;
					break;
				}
			});

			team_selector.get(Team.Werewolf).basic.find('input').val(werewolf_num);
			team_selector.get(Team.Villager).basic.find('input').val(villager_num);

			$('ul.role-selector > li').each(function(){
				let li = $(this);
				let role_id = parseInt(li.data('role-id'), 10);
				if (!isNaN(role_id)) {
					if (roles.indexOf(role_id) != -1) {
						li.addClass('selected');
					} else {
						li.removeClass('selected');
					}
				}
			});

		} catch (e) {
			ShowMessage(e.toString());
		}
	}

	let button_area = $('<div class="button-area"></div>');
	let return_button = $('<button type="button"></button>');
	return_button.html('返回');
	button_area.append(return_button);
	let create_button = $('<button type="button"></button>');
	create_button.html('创建房间');
	button_area.append(create_button);
	root.append(button_area);

	create_button.click(() => {
		let roles = [];

		$('.role-selector.number-selector input').each(function () {
			let input = $(this);
			let role_id = input.data('role-id');
			let num = parseInt(input.val(), 10);
			if (!isNaN(num)) {
				for (let i = 0; i < num; i++) {
					roles.push(role_id);
				}
			}
		});

		$('ul.role-selector > li').each(function () {
			let li = $(this);
			if (li.hasClass('selected')) {
				let role_id = parseInt(li.data('role-id'), 10);
				if (!isNaN(role_id)) {
					roles.push(role_id);
				}
			}
		});

		if (roles.length <= 0) {
			MakeToast('请选择角色。 ');
			return;
		}

		button_area.html('创建中...');
		$room.roles = roles.map(role => Role.fromNum(role));
		localStorage.setItem('setting.roles', JSON.stringify(roles));
		$client.request(net.CreateRoom, {'roles': roles}, result => {
			if (!result.id) {
				MakeToast('创建房间失败。');
				return;
			}

			$room.restoreState(result);

			$room.owner.id = $user.id;
			$room.owner.key = result.ownerKey;
			$room.writeSession({
				ownerId: $user.id,
				ownerKey: result.ownerKey
			});

			LoadPage('enter-room');
		});
	});

	return_button.click(() => {
		button_area.html('加载中...');
		LoadPage('enter-lobby');
	});
});
