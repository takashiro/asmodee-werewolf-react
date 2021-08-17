import Page from './Page';

export default class RoomPage extends Page {
	async open(path = ''): Promise<void> {
		await super.open(path);
		const room = await $('.room');
		await room.waitForDisplayed();
	}

	async getShareLink(): Promise<WebdriverIO.Element> {
		const area = await $('.room .share-link-area');
		const a = await area.$('a');
		return a;
	}
}
