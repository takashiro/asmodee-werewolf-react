
const $user = {
	id: 0,
	role: 0,
	name: ''
};

const $room = {
	id: 0,
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
		LoadScript('page/' + page, () => {
			ShowMessage('');
		});
	} catch (e) {
		ShowMessage(e.toString());
	}
}

LoadPage('login');
