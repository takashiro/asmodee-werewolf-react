export default class HttpError extends Error {
	code: number;

	constructor(code: number, message: string) {
		super(message);
		this.code = code;
	}
}
