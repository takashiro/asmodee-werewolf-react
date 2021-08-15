import LobbyPage from '../pageObjects/LobbyPage';
import Toast from '../pageObjects/Toast';

const page = new LobbyPage();
const toast = new Toast();

beforeAll(async () => {
	await page.open();
});

describe('Lobby', () => {
	it('opens the home page', async () => {
		await browser.saveScreenshot('test/output/lobby-home.png');
	});
});

describe('Enter Room', () => {
	it('tries to enter a room without a number', async () => {
		await page.enterRoom();
		const message = await toast.getMessage();
		expect(message).toBe('请输入一个数字。');
		await toast.dismissed();
	});

	it('tries to enter an invalid number', async () => {
		await page.setRoomNumber('test');
		await page.enterRoom();
		const message = await toast.getMessage();
		expect(message).toBe('请输入一个数字。');
		await toast.dismissed();
	});

	it('tries to enter a non-existing room', async () => {
		await page.setRoomNumber(99999);
		await page.enterRoom();
		const message = await toast.getMessage();
		expect(message).toBe('房间不存在。');
		await toast.dismissed();
	});
});
