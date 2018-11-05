
import net from './api';
import querystring from 'querystring';

class ServerException extends Error {

	constructor(code, message) {
		super(message);
		this.code = code;
	}

}

class Client {

	constructor(url = '') {
		this.serverUrl = url;
	}

	request(method, api, data){
		let request = new XMLHttpRequest;

		let result = new Promise(function (resolve, reject) {
			request.onreadystatechange = function () {
				if (this.readyState != XMLHttpRequest.DONE) {
					return;
				}

				if (this.status == 200) {
					if (this.responseText) {
						let response = null;
						try {
							response =JSON.parse(this.responseText);
							resolve(response);
						} catch (error) {
							reject(error);
						}
					} else {
						resolve();
					}
				} else {
					reject(new ServerException(this.status, this.responseText));
				}
			};
		});

		request.open(method, this.serverUrl + api);
		request.send(data);

		return result;
	}

	get(api, data = null) {
		if (data) {
			api += '?' + querystring.stringify(data);
		}
		return this.request('GET', api);
	}

	post(api, data) {
		return this.request('POST', api, data ? JSON.stringify(data) : '');
	}

	delete(api, data = null) {
		if (data) {
			api += '?' + querystring.stringify(data);
		}
		return this.request('DELETE', api);
	}

}

let $client = new Client();

let match = location.href.match(/(^\w+)\:\/\/([^/]+)/i);
if (match && match[1] && match[2]) {
	$client.serverUrl = match[1] + '://' + match[2] + '/api/';
} else {
	$client.serverUrl = 'http://localhost:2620/';
}

export {
	$client,
	net
};
