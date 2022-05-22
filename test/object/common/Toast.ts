import Component from './Component';

export default class Toast extends Component {
	async getMessage(): Promise<string> {
		return this.e.textContent();
	}

	async dismissed(): Promise<void> {
		return this.e.waitFor({ state: 'hidden' });
	}
}
