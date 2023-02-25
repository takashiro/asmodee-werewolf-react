import { Locator, LocatorScreenshotOptions } from '@playwright/test';

type Role = Parameters<Locator['getByRole']>[0];
type GetByRoleOptions = Parameters<Locator['getByRole']>[1];

export default abstract class BasicLocator {
	protected e: Locator;

	constructor(element: Locator | BasicLocator) {
		if ('raw' in element) {
			this.e = element.raw();
		} else {
			this.e = element;
		}
	}

	protected raw(): Locator {
		return this.e;
	}

	getByRole(role: Role, options: GetByRoleOptions = {}) {
		if (options.exact === undefined) {
			options.exact = true;
		}
		return this.e.getByRole(role, options);
	}

	screenshot(options: LocatorScreenshotOptions) {
		return this.e.screenshot(options);
	}

	textContent() {
		return this.e.textContent();
	}
}
