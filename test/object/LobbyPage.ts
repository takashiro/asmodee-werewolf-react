import { Locator } from '@playwright/test';

import Page from './common/Page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LobbyPage extends Page {
	async load(): Promise<void> {
		await super.load();
		await this.page.waitForSelector('.lobby');
	}

	getRoomNumber(): Locator {
		return this.locator('.lobby input[type="number"]');
	}

	async enterRoom(): Promise<void> {
		const button = this.getEnterButton();
		await button.click();
	}

	getEnterButton(): Locator {
		return this.locator('.lobby input[type="number"] + button');
	}
}
