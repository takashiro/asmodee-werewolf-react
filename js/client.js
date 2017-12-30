
class Client {

	constructor(url = '') {
		this.serverUrl = url;
	}

	request(api, data, callback) {
		let param = data ? JSON.stringify(data) : '';
		$.ajax(this.serverUrl + api, {
			type: 'POST',
			data: param,
			dataType: 'json',
			success: result => {
				if (!result) {
					MakeToast('服务器异常。');
					return;
				}

				if (callback) {
					callback(result);
				}
			},
			error: (xhr, status, message) => {
				if (status == 'timeout') {
					MakeToast('服务器繁忙，请稍后重试。');
				} else if (status == 'abort') {
					MakeToast('网络连接中断，请稍后重试。');
				} else if (status == 'parsererror') {
					MakeToast('解析错误。');
				} else {
					MakeToast('未知错误。');
				}
			}
		});
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
		$client.serverUrl = match[1] + '://' + match[2] + '/api/';
	} else {
		$client.serverUrl = 'http://localhost:2620/';
	}
})();
