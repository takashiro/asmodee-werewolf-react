import TextBox from './TextBox';

export default class SpinButton extends TextBox {
	async getNumberValue(): Promise<number> {
		const value = await this.getValue();
		return Number.parseInt(value, 10);
	}
}
