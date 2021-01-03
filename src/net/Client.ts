export default class Client {
	protected server: string;

	constructor(url = '') {
		this.server = url;
	}

	get(api: string): Promise<Response> {
		return window.fetch(
			this.server + api,
			{
				method: 'GET',
			},
		);
	}

	post(api: string, data: unknown): Promise<Response> {
		return window.fetch(
			this.server + api,
			{
				method: 'POST',
				body: JSON.stringify(data),
			},
		);
	}

	delete(api: string): Promise<Response> {
		return window.fetch(
			this.server + api,
			{
				method: 'DELETE',
			},
		);
	}
}

let serverUrl = 'http://localhost:2620/';
const match = window.location.href.match(/(^\w+):\/\/([^/]+)/i);
if (match && match[1] && match[2]) {
	serverUrl = `${match[1]}://${match[2]}/api/`;
}

export const client = new Client(serverUrl);
