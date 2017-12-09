
DeclareModule('page/create-room', () => {
	let root = $('#root');
	root.html('');

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
		let decrease = $('<button type="button" class="decrease"></button>');
		number_input.append(decrease);
		let input = $('<input type="number"></input>');
		input.val('0');
		number_input.append(input);
		let increase = $('<button type="button" class="increase"></button>');
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

	werewolf_team.append(create_number_input(Role.Werewolf));

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

	root.append(werewolf_team);


	// Construct Team Villager
	let villager_team = $('<div class="box"><h3>神民阵营</h3></div>');

	villager_team.append(create_number_input(Role.Villager));

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

	root.append(other_roles);

	let button_area = $('<div class="button-area"></div>');
	let create_button = $('<button type="button"></button>');
	create_button.html('创建房间');
	button_area.append(create_button);
	root.append(button_area);
});
