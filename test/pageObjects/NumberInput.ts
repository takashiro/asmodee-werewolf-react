export default class NumberInput {
	protected e: WebdriverIO.Element;

	constructor(e: WebdriverIO.Element) {
		this.e = e;
	}

	async increase(): Promise<void> {
		const button = await this.e.$('button.increase');
		await button.click();
	}

	async decrease(): Promise<void> {
		const button = await this.e.$('button.decrease');
		await button.click();
	}

	async getValue(): Promise<number> {
		const input = await this.e.$('input[type="number"]');
		const value = await input.getValue();
		return Number.parseInt(value, 10);
	}
}
