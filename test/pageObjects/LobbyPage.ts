import Page from './Page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LobbyPage extends Page {
	/**
     * overwrite specifc options to adapt it to page object
     */
	open(): Promise<string> {
		return super.open('');
	}
}
