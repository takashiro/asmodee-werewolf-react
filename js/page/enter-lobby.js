
DeclareModule('page/enter-lobby', () => {
	ShowMessage('');

	let root = $('#root');
	root.html('');

	let create_form = $('<div class="simple-form"></div>');
	let create_button = $('<button type="button">创建房间</button>');
	create_form.append(create_button);
	root.append(create_form);

	let enter_form = $('<div class="simple-form lobby"></div>');
	let enter_input = $('<input type="number"></input>');
	enter_input.prop('placeholder', '房间号');
	enter_form.append(enter_input);
	let enter_button = $('<button type="button">加入房间</button>');
	enter_form.append(enter_button);
	root.append(enter_form);

	enter_form.on('room-not-exist', () => {
		enter_input.val('');
		enter_input.focus();
	});

	create_button.click(() => {
		LoadPage('create-room');
	});

	enter_button.click(()=>{
		let room_id = parseInt(enter_input.val(), 10);
		if (isNaN(room_id)) {
			MakeToast('请输入一个数字。');
			enter_input.val('');
			enter_input.focus();
			return;
		}

		$client.request(net.EnterRoom, {id: room_id}, args => {
			if (args.id <= 0) {
				MakeToast('房间不存在。');
				enter_input.val('');
				enter_input.focus();
				return;
			}

			Object.assign($room, args);
			LoadPage('enter-room');
		});
	});

	if ($_GET['room_id']) {
		let room_id = parseInt($_GET['room_id'], 10);
		if (!isNaN(room_id) && room_id > 0) {
			enter_input.val(room_id);
			enter_button.click();
		}

		delete $_GET['room_id'];
	}
});
