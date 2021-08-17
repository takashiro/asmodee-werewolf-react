import RoomCreatorPage from '../pageObjects/RoomCreatorPage';
import RoomPage from '../pageObjects/RoomPage';

let shareLink = '';

describe('Owner', () => {
	it('creates a new room', async () => {
		const page = new RoomCreatorPage();
		await page.open();
		await page.submit();
	});

	it('copies share link', async () => {
		const page = new RoomPage();
		const a = await page.getShareLink();
		const href = await a.getAttribute('href');
		const text = await a.getText();
		expect(href).toBe(text);
		expect(href).toMatch(/^http:\/\/localhost:\d+\/\?id=\d+$/);
		shareLink = href;
	});

	it('reloads sessions', async () => {
		await browser.reloadSession();
	});
});

describe('Player', () => {
	const page = new RoomPage();

	it('opens the share link', async () => {
		await page.open(shareLink);
		await browser.saveScreenshot('test/output/room-shared.png');
	});
});
