import Page from './common/Page';
import WebElement from './common/WebElement';

export default class RoomPage extends Page {
	async load(path = '.'): Promise<void> {
		await super.load(path);
		await this.page.waitForSelector('.room');
	}

	async getShareLink(): Promise<WebElement> {
		const area = await this.locator('.room .share-link-area').elementHandle();
		return area.$('a');
	}
}
