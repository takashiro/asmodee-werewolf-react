
import API from './api';

class Client {

	constructor(url = '') {
		this.serverUrl = url;
	}

	request(api, data, callback) {
		let param = data ? JSON.stringify(data) : '';

		var request = new XMLHttpRequest();

		request.onreadystatechange = function() {
			if (this.readyState != XMLHttpRequest.DONE) {
				return;
			}

			if (this.status == 200) {
				if (!this.responseText) {
					alert('服务器异常。');
					return;
				}

				let response = null;
				try {
					response =JSON.parse(this.responseText);
				} catch (e) {
					alert(e);
				}

				if (callback) {
					callback.call(window, response);
				}
			} else if (this.status == 400) {

			}
		};

		request.open('POST', this.serverUrl + api);
		request.send(param);
	}
}

let $client = new Client();
$client.API = API;

let match = location.href.match(/(^\w+)\:\/\/([^/]+)/i);
if (match && match[1] && match[2]) {
	$client.serverUrl = match[1] + '://' + match[2] + '/api/';
} else {
	$client.serverUrl = 'http://localhost:2620/';
}

export default $client;
