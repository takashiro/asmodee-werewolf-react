export default class Client {
	protected server: string;

	constructor(url = 'api') {
		this.server = url;
	}

	derive(context: string): Client {
		return new Client(`${this.server}/${context}`);
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

export const client = new Client();
