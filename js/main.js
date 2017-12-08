
const $user = {
	id: 0,
	name: ''
};

const $room = {
	id: 0,
	roles: [],
	players: {}
};

function ShowMessage(message) {
	$('#message-box').html(message);
}

ScriptLoader = document.getElementById('script-loader');

function LoadPage(page) {
	ShowMessage('加载中...');
	LoadScript('page/' + page, () => {
		ShowMessage('');
	});
}

LoadPage('login');
