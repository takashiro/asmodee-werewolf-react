import Page from './Page';
import NumberInput from './NumberInput';

export default class RoomCreatorPage extends Page {
	async open(): Promise<void> {
		await super.open();
		const button = await $('.lobby button');
		if (button) {
			await button.click();
			await this.loaded();
		}
	}

	async getWerewolfInput(): Promise<NumberInput> {
		const selector = await $('.number-selector');
		return new NumberInput(selector);
	}
}
