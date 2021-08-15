import Page from './Page';

export default class RoomCreatorPage extends Page {
	async open(): Promise<void> {
		await super.open();
		const button = await $('.lobby button');
		if (button) {
			await button.click();
			await this.loaded();
		}
	}
}
