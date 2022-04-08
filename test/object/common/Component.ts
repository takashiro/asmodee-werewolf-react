import idle from '../../util/idle';

import WebElement from './WebElement';

export default abstract class Component {
	protected element: WebElement;

	constructor(element: WebElement) {
		this.element = element;
	}

	getHandle(): WebElement {
		return this.element;
	}

	$(selector: string): Promise<WebElement | null> {
		return this.element.$(selector);
	}

	$$(selector: string): Promise<WebElement[]> {
		return this.element.$$(selector);
	}

	async locate(selector: string): Promise<WebElement | null> {
		for (let i = 0; i < 10; i++) {
			const e = await this.$(selector);
			if (e) {
				return e;
			}
			await idle(100);
		}
		return null;
	}
}
