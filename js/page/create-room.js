
DeclareModule('page/create-room', () => {
	ShowMessage('');

	let root = $('#root');
	root.html('');

	let multi_selector_click = e => {
		let li = $(e.currentTarget);
		li.toggleClass('selected');
	};

	function create_option(role_id){
		let li = $('<li></li>');
		li.data('role-id', role_id);
		let icon = Role.createImage(role_id);
		li.append(icon);
		let name = $('<span class="name"></span>');
		name.text(Role.convertToName(role_id));
		li.append(name);
		return li;
	}

	function create_number_input(role_id){
		let box = $('<div class="role-selector number-selector"></div>');

		let icon = $('<div class="icon"></div>');
		let image = Role.createImage(role_id);
		icon.append(image);
		let name = $('<span class="name"></span>');
		name.text(Role.convertToName(role_id));
		icon.append(name);
		box.append(icon);

		let number_input = $('<div class="number-input"></div>');
		let decrease = $('<div class="decrease"></div>');
		number_input.append(decrease);
		let input = $('<input type="number"></input>');
		input.data('role-id', role_id);
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

	// Construct Team Werewolf
	let werewolf_team = $('<div class="box"><h3>狼人阵营</h3></div>');

	let werewolf_selector = create_number_input(Role.Werewolf);
	werewolf_team.append(werewolf_selector);

	let werewolf_specials = [
		Role.WolfKing,
		Role.WhiteWolfKing,
		Role.WolfBeauty,
		Role.SecretWolf
	];
	let werewolf_special_selector = $('<ul class="role-selector"></ul>');
	for (let role_id of werewolf_specials) {
		werewolf_special_selector.append(create_option(role_id));
	}
	werewolf_team.append(werewolf_special_selector);
	werewolf_special_selector.on('click', 'li', multi_selector_click);

	root.append(werewolf_team);


	// Construct Team Villager
	let villager_team = $('<div class="box"><h3>神民阵营</h3></div>');

	let villager_selector = create_number_input(Role.Villager);
	villager_team.append(villager_selector);

	let gods = [
		Role.Seer,
		Role.Tamer,
		Role.Witch,
		Role.Hunter,
		Role.Guard,
		Role.Magician,
		Role.Idiot,
		Role.Elder,
		Role.Knight,
		Role.Dementor,
		Role.Rogue
	];
	let god_selector = $('<ul class="role-selector"></ul>');
	for (let role_id of gods) {
		god_selector.append(create_option(role_id));
	}
	villager_team.append(god_selector);
	god_selector.on('click', 'li', multi_selector_click);

	root.append(villager_team);

	// Other roles
	let other_roles = $('<div class="box"><h3>其他角色</h3></div>');
	let others = [
		Role.Jupiter,
		Role.FeralChild,
		Role.Thief,
		Role.Bombman,
	];

	let other_selector = $('<ul class="role-selector"></ul>');
	for (let role_id of others) {
		other_selector.append(create_option(role_id));
	}
	other_roles.append(other_selector);
	other_selector.on('click', 'li', multi_selector_click);

	root.append(other_roles);

	let pref_roles = localStorage.getItem('setting.roles');
	if (pref_roles) {
		try {
			let roles = JSON.parse(pref_roles);

			let werewolf_input = werewolf_selector.find('input');
			werewolf_input.val('0');
			let werewolf_num = 0;

			let villager_input = villager_selector.find('input');
			villager_input.val('0');
			let villager_num = 0;

			roles.forEach(role => {
				switch (role) {
				case Role.Werewolf:
					werewolf_num++;
					break;
				case Role.Villager:
					villager_num++;
					break;
				}
			});
			werewolf_input.val(werewolf_num);
			villager_input.val(villager_num);

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
	let create_button = $('<button type="button"></button>');
	create_button.html('创建房间');
	button_area.append(create_button);
	root.append(button_area);

	create_button.click(e => {
		create_button.hide();

		let message = $('<div class="inline-message"></div>');
		message.html('创建中...');
		button_area.append(message);

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

		$room.roles = roles;
		localStorage.setItem('setting.roles', JSON.stringify(roles));
		$client.request(net.RequestRoomId);
	});
});
