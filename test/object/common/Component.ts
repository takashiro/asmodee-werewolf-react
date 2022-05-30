import { Locator, LocatorScreenshotOptions } from '@playwright/test';

interface LocatorOptions {
	has?: Locator;
	hasText?: string | RegExp;
}

export default abstract class Component {
	protected e: Locator;

	constructor(element: Locator) {
		this.e = element;
	}

	getHandle(): Locator {
		return this.e;
	}

	locator(selector: string, options?: LocatorOptions): Locator {
		return this.e.locator(selector, options);
	}

	screenshot(options: LocatorScreenshotOptions) {
		return this.e.screenshot(options);
	}
}
