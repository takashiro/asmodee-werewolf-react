/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
export default class Page {
	protected baseUrl = 'http://localhost:9528';

	/**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
	open(path: string): Promise<string> {
		return browser.url(`${this.baseUrl}/${path}`);
	}
}
