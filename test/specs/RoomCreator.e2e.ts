import RoomCreatorPage from '../pageObjects/RoomCreatorPage';

const page = new RoomCreatorPage();

beforeAll(async () => {
	await page.open();
});

describe('Room Creator', () => {
	it('takes a screenshot', async () => {
		await browser.saveScreenshot('test/output/room-creator.png');
	});
});
