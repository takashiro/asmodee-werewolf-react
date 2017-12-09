
const net = DeclareCommand(
	'ArrangeRole',
	'FetchRole',
	'UpdateRole',

	'WerewolfCommandCount'
);

$client = new Client;

$client.bind(net.RequestUserId, user_id => {
	$user.id = user_id;
	$client.request(net.Login, {
		uid: user_id
	});
	window.localStorage.setItem('nickname', $user.name);
});

$client.bind(net.Login, uid => {
	$user.id = uid;
	if (uid > 0) {
		LoadPage('enter-lobby');
	} else {
		MakeToast('Login failed.');
	}
});

$client.bind(net.RequestRoomId, room_id => {
	if (room_id > 0) {
		$room.id = room_id;
		$client.request(net.CreateRoom, {
			id: room_id,
			game: 'werewolf'
		});
	} else {
		MakeToast('服务器繁忙，创建房间失败。');
	}
});

$client.bind(net.CreateRoom, room_id => {
	if (room_id > 0) {
		$room.id = room_id;
	} else {
		MakeToast('创建房间失败。');
	}
});

$client.bind(net.EnterRoom, info => {
	if (!info) {
		ShowMessage('');
		MakeToast('房间不存在。');
		return;
	}

	$room.id = info['room_id'];
	$room.owner.id = info['owner_id'];

	if ($room.id <= 0) {
		MakeToast('房间运行错误。');
		return;
	}

	if ($room.owner.id == $user.id) {
		$client.request(net.UpdateRoom, {
			roles: $room.roles
		});

		LoadPage('enter-god-view');
	} else {
		LoadPage('enter-room');
	}
});

$client.bind(net.ArrangeRole, roles => {

});

$client.bind(net.UpdateRole, info => {

});

$client.bind(net.FetchRole, role => {

});
