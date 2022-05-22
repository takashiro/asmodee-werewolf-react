import { Locator } from '@playwright/test';

import Page from './common/Page';

export default class RoomPage extends Page {
	async load(path = '.'): Promise<void> {
		await super.load(path);
		await this.page.waitForSelector('.room');
	}

	getShareLink(): Locator {
		const area = this.locator('.room .share-link-area');
		return area.locator('a');
	}
}
