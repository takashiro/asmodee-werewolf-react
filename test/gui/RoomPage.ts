import { Page } from '@playwright/test';

import BasicPage from '../common/BasicPage';

export default class RoomPage extends BasicPage {
	protected id: number;

	constructor(page: Page, id: number) {
		super(page);
		this.id = id;
	}

	async load(): Promise<void> {
		await this.page.goto(`./?id=${this.id}`);
		await this.page.waitForSelector('.room');
	}
}
