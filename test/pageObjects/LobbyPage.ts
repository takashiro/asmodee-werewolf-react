import Page from './Page';

/**
 * sub page containing specific selectors and methods for a specific page
 */
export default class LobbyPage extends Page {
	async open(): Promise<void> {
		await super.open();
		await browser.waitUntil(async () => {
			const lobby = await $('.lobby');
			return Boolean(lobby);
		});
		await this.loaded();
	}
}
