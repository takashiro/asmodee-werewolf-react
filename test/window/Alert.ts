import Window from '../common/Window';

export default class Alert extends Window {
	getMessage() {
		return this.e.textContent();
	}

	dismissed() {
		return this.e.waitFor({ state: 'hidden' });
	}
}
