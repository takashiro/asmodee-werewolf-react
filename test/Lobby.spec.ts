import { expect, test } from '@playwright/test';

import LobbyPage from './gui/LobbyPage';
import Form from './structure/Form';

test.use({
	locale: 'zh-CN',
});

test('opens the home page', async ({ page }) => {
	const lobby = new LobbyPage(page);
	await lobby.load();
	await page.screenshot({
		path: 'test/output/lobby-home.png',
	});
});

test('tries to enter a room without a number', async ({ page }) => {
	const lobby = new LobbyPage(page);
	await lobby.load();

	const main = new Form(lobby.getMain());
	await main.getButton('进入房间').trigger();

	const alert = main.getAlert();
	const message = await alert.getMessage();
	expect(message).toBe('请输入一个数字。');
	await alert.dismissed();
});

test.fixme('tries to enter a non-existing room', async ({ page }) => {
	const lobby = new LobbyPage(page);
	await lobby.load();

	const main = new Form(lobby.getMain());
	const roomNumber = main.getTextBox('房间号');
	await roomNumber.fill('99999');
	await main.getButton('进入房间').trigger();

	const alert = main.getAlert();
	const message = await alert.getMessage();
	expect(message).toBe('房间不存在。');
	await alert.dismissed();
});
