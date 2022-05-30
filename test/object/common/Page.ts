import {
	Locator,
	Page as BrowserPage,
} from '@playwright/test';

import LocaleList from './LocaleList';
import Toast from './Toast';

export default abstract class Page {
	protected readonly page: BrowserPage;

	constructor(page: BrowserPage) {
		this.page = page;
	}

	locator(selector: string): Locator {
		return this.page.locator(selector);
	}

	getToast(): Toast {
		const toast = this.locator('#overlay .toast');
		return new Toast(toast);
	}

	async load(url = './?lang=zh-CN'): Promise<void> {
		await this.page.goto(url);
	}

	getLocaleList() {
		return new LocaleList(this.locator('footer .locale-list'));
	}
}
