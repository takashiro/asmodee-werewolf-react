import BasicLocator from '../common/BasicLocator';

export default class Toast extends BasicLocator {
	getMessage() {
		return this.e.textContent();
	}

	async dismissed(): Promise<void> {
		return this.e.waitFor({ state: 'hidden' });
	}
}
