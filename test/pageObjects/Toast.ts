export default class Toast {
	getElement(): ReturnType<WebdriverIO.Browser['$']> {
		return $('#overlay .toast');
	}

	async getMessage(): Promise<string> {
		const e = await this.getElement();
		return e ? e.getText() : '';
	}

	async dismissed(): Promise<void> {
		try {
			const e = this.getElement();
			await e.waitForExist({ reverse: true });
		} catch (error) {
			// ignore
		}
	}
}
