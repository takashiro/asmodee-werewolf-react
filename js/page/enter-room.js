
DeclareModule('page/enter-room', () => {
	let root = $('#root');
	root.html('');

	let room_info = $('<div class="inline-message"></div>');
	room_info.html('房间号是 ' + $room.id);
	root.append(room_info);

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
	let special_werewolf_list = $('<ul class="role-list"></ul>');
	werewolf_team.append(special_werewolf_list);
	role_table.append(werewolf_team);

	let villager_team = $('<div class="box"><h3>神民阵营</h3></div>');
	let villager_list = $('<ul class="role-list"></ul>');
	villager_team.append(villager_list);
	let god_list = $('<ul class="role-list"></ul>');
	villager_team.append(god_list);
	role_table.append(villager_team);

	root.append(role_table);

	let update_roles = () => {
		let werewolves = [];
		let special_werewolves = [];
		let villagers = [];
		let gods = [];
		$room.roles.forEach(role => {
			if (role == Role.Werewolf) {
				werewolves.push(role);
			} else if (role == Role.Villager) {
				villagers.push(role);
			} else if (werewolf_roles.indexOf(role) != -1) {
				special_werewolves.push(role);
			} else {
				gods.push(role);
			}
		});

		werewolf_list.html('');
		werewolves.forEach(role => {
			werewolf_list.append(create_icon(role));
		});

		special_werewolf_list.html('');
		if (werewolves.length < 4 && special_werewolves.length < 4) {
			special_werewolves.forEach(role => {
				werewolf_list.append(create_icon(role));
			});
		} else {
			special_werewolves.forEach(role => {
				special_werewolf_list.append(create_icon(role));
			});
		}

		villager_list.html('');
		villagers.forEach(role => {
			villager_list.append(create_icon(role));
		});

		god_list.html('');
		if (villager_list.length < 4 && gods.length < 4) {
			gods.forEach(role => {
				villager_list.append(create_icon(role));
			});
		} else {
			gods.forEach(role => {
				god_list.append(create_icon(role));
			});
		}
	};
	role_table.on('update-role', update_roles);
	update_roles();
});
