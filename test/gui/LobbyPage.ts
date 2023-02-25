import BasicPage from '../common/BasicPage';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LobbyPage extends BasicPage {
	override async load(): Promise<void> {
		await this.page.goto('/');
		await this.page.waitForSelector('.lobby');
	}
}
