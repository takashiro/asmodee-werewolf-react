
DeclareModule('page/enter-room', () => {
	let root = $('#root');
	root.html('');

	function create_icon(role_id){
		let li = $('<li></li>');
		li.data('role-id', role_id);
		let icon = Role.createImage(role_id);
		li.append(icon);
		let name = $('<span class="name"></span>');
		name.text(Role.convertToName(role_id));
		li.append(name);
		return li;
	}

	let werewolf_roles = [
		Role.WolfKing,
		Role.WhiteWolfKing,
		Role.WolfBeauty,
		Role.SecretWolf
	];

	let role_table = $('<div class="role-table"></div>');

	let werewolf_team = $('<div class="box"><h3>狼人阵营</h3></div>');
	let werewolf_list = $('<ul class="role-list"></ul>');
	werewolf_team.append(werewolf_list);
	let werewolf_special_list = $('<ul class="role-list"></ul>');
	werewolf_team.append(werewolf_special_list);
	role_table.append(werewolf_team);

	let villager_team = $('<div class="box"><h3>神民阵营</h3></div>');
	let villager_list = $('<ul class="role-list"></ul>');
	villager_team.append(villager_list);
	let god_list = $('<ul class="role-list"></ul>');
	villager_team.append(god_list);
	role_table.append(villager_team);

	root.append(role_table);

	let update_roles = () => {
		role_table.find('.role-list').html('');
		$room.roles.forEach(role => {
			if (role == Role.Werewolf) {
				werewolf_list.append(create_icon(role));
			} else if (role == Role.Villager) {
				villager_list.append(create_icon(role));
			} else if (werewolf_roles.indexOf(role) != -1) {
				werewolf_special_list.append(create_icon(role));
			} else {
				god_list.append(create_icon(role));
			}
		});
	};
	role_table.on('update-role', update_roles);
	update_roles();
});
