import Component from './common/Component';

export default class NumberInput extends Component {
	async increase(): Promise<void> {
		const button = this.locator('.increase');
		await button.click();
	}

	async decrease(): Promise<void> {
		const button = this.locator('.decrease');
		await button.click();
	}

	async getValue(): Promise<number> {
		const input = this.locator('input[type="number"]');
		const value = await input.inputValue();
		return Number.parseInt(value, 10);
	}
}
