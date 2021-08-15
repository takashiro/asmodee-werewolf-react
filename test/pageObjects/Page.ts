/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
	protected width = 414;

	protected height = 736;

	/**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
	async open(path = '/'): Promise<void> {
		await browser.setWindowSize(this.width, this.height);
		await browser.url(path);
		await this.loaded();
	}

	async loaded(): Promise<void> {
		browser.waitUntil(async () => {
			const state = await browser.execute(() => document.readyState);
			return state === 'complete';
		});
	}
}
