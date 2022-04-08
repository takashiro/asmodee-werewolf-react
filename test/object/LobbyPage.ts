import Page from './common/Page';
import WebElement from './common/WebElement';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LobbyPage extends Page {
	async load(): Promise<void> {
		await super.load();
		await this.page.waitForSelector('.lobby');
	}

	async getRoomNumber(): Promise<WebElement | null> {
		return this.$('.lobby input[type="number"]');
	}

	async enterRoom(): Promise<void> {
		const button = await this.getEnterButton();
		await button.click();
	}

	getEnterButton(): Promise<WebElement | null> {
		return this.$('.lobby input[type="number"] + button');
	}
}
