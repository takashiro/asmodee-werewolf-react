import Component from './Component';

export default class Toast extends Component {
	async getMessage(): Promise<string> {
		return this.element.textContent();
	}

	async dismissed(): Promise<void> {
		return this.element.waitForElementState('hidden');
	}
}
