import {
	Locator,
	Page as BrowserPage,
} from '@playwright/test';

import Toast from './Toast';
import WebElement from './WebElement';

export default abstract class Page {
	protected readonly page: BrowserPage;

	constructor(page: BrowserPage) {
		this.page = page;
	}

	$(selector: string): Promise<WebElement | null> {
		return this.page.$(selector);
	}

	$$(selector: string): Promise<WebElement[]> {
		return this.page.$$(selector);
	}

	locator(selector: string): Locator {
		return this.page.locator(selector);
	}

	async getToast(): Promise<Toast | null> {
		const toast = this.locator('#overlay .toast');
		return new Toast(await toast.elementHandle());
	}

	async load(url = './?lang=zh-CN'): Promise<void> {
		await this.page.goto(url);
	}
}
