export default class Client {
	protected server: string;

	constructor(url = '') {
		this.server = url;
	}

	get(api: string): Promise<Response> {
		return window.fetch(
			`${this.server}/${api}`,
			{
				method: 'GET',
			},
		);
	}

	post(api: string, data: unknown): Promise<Response> {
		return window.fetch(
			`${this.server}/${api}`,
			{
				method: 'POST',
				headers: {
					'content-type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		);
	}

	delete(api: string): Promise<Response> {
		return window.fetch(
			`${this.server}/${api}`,
			{
				method: 'DELETE',
			},
		);
	}
}

const params = new URLSearchParams(window.location.search);
const serverUrl = params.get('server') || 'api';
export const client = new Client(serverUrl);
