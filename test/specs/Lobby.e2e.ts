import LobbyPage from '../pageObjects/LobbyPage';

const page = new LobbyPage();

beforeAll(async () => {
	await page.open();
});

describe('Lobby', () => {
	it('opens the home page', async () => {
		await browser.saveScreenshot('test/output/lobby.png');
	});
});
