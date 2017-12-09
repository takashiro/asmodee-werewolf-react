
DeclareModule('page/enter-lobby', () => {
	let root = $('#root');
	root.html('');

	let create_form = $('<div class="simple-form"></div>');
	let create_button = $('<button type="button">创建房间</button>');
	create_form.append(create_button);
	root.append(create_form);

	let enter_form = $('<div class="simple-form"></div>');
	let enter_input = $('<input type="number"></input>');
	enter_input.prop('placeholder', '房间号');
	enter_form.append(enter_input);
	let enter_button = $('<button type="button">加入房间</button>');
	enter_form.append(enter_button);
	root.append(enter_form);

	create_button.click(() => {
		LoadPage('create-room');
	});
});
