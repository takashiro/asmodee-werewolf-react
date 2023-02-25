import { Page } from '@playwright/test';

import Landmark from '../structure/Landmark';

export default abstract class BasicPage {
	protected readonly page: Page;

	constructor(page: Page) {
		this.page = page;
	}

	abstract load(): Promise<void>;

	getBanner() {
		return new Landmark(this.page.getByRole('banner'));
	}

	getMain() {
		return new Landmark(this.page.getByRole('main'));
	}

	getContentInfo() {
		return new Landmark(this.page.getByRole('contentinfo'));
	}
}
