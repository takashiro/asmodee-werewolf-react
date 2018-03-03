
const $user = {
	id: Math.floor(Math.random() * 0x7FFFFFFF),
	role: Role.Unknown,
	cards: [],
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

$room.session = new Session('room-session');

$room.readSession = function () {
	return this.session.read(this.salt);
}

$room.writeSession = function (value, expiry) {
	this.session.write(this.salt, value, expiry);
};

$room.restoreState = function (result) {
	if (result.id) {
		this.id = result.id;
	}
	if (result.salt) {
		this.salt = result.salt;
	}
	if (result.roles && result.roles instanceof Array) {
		this.roles = result.roles.map(num => Role.fromNum(num));
	}
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
