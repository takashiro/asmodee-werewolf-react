import { test, expect } from '@playwright/test';

import LobbyPage from './object/LobbyPage';

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
	await lobby.enterRoom();
	const toast = lobby.getToast();
	const message = await toast.getMessage();
	expect(message).toBe('请输入一个数字。');
	await toast.dismissed();
});

test('tries to enter a non-existing room', async ({ page }) => {
	const lobby = new LobbyPage(page);
	await lobby.load();
	const roomNumber = lobby.getRoomNumber();
	await roomNumber.type('99999');
	await lobby.enterRoom();
	const toast = lobby.getToast();
	const message = await toast.getMessage();
	expect(message).toBe('房间不存在。');
	await toast.dismissed();
});
