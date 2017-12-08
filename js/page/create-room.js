
DeclareModule('page/create-room', () => {
	let root = $('#root');
	root.html('');

	function create_option(role_id){
		let li = $('<li></li>');
		let icon = Role.createImage(role_id);
		li.append(icon);
		let name = $('<span class="name"></span>');
		name.text(Role.convertToName(role_id));
		li.append(name);
		return li;
	}

	// Construct Team Werewolf
	let werewolf_team = $('<div class="box"><h3>狼人阵营</h3></div>');

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
});
