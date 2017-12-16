
class Client {

	constructor(url = '') {
		this.serverUrl = url;
	}

	request(api, data, callback) {
		let param = data ? JSON.stringify(data) : '';
		$.post(this.serverUrl + api, param, result => {
			if (!result) {
				MakeToast('服务器异常。');
				return;
			}

			if (callback) {
				callback(result);
			}
		}, 'json');
	}

}

const net = {
	CreateRoom: 'createroom',
	EnterRoom: 'enterroom',
	FetchRole: 'fetchrole'
};

let $client = new Client();
(() => {
	let match = location.href.match(/(^\w+)\:\/\/([^/]+)/i);
	if (match && match[1] && match[2]) {
		$client.serverUrl = match[1] + '://' + match[2] + '/?mod=werewolf';
	} else {
		$client.serverUrl = 'server/?mod=werewolf';
	}
})();
