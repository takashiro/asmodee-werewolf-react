import LobbyPage from '../pageObjects/LobbyPage';

const page = new LobbyPage();

it('should login with valid credentials', async () => {
	await browser.setWindowSize(414, 736);
	await page.open();
	await browser.saveScreenshot('test/output/lobby.png');
});
