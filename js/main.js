
const $user = {
	id: Math.floor(Math.random() * 0x7FFFFFFF),
	role: 0,
	name: ''
};

const $room = {
	id: 0,
	salt: 0,
	owner: {
		id: 0
	},
	roles: [],
	players: {}
};

function ShowMessage(message) {
	$('#message-box').html(message);
}

ScriptLoader = document.getElementById('script-loader');

function LoadPage(page) {
	ShowMessage('加载中...');
	try {
		LoadScript('page/' + page);
	} catch (e) {
		ShowMessage(e.toString());
	}
}

LoadPage('login');
