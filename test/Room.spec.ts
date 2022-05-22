import { test, expect } from '@playwright/test';

import RoomCreatorPage from './object/RoomCreatorPage';
import RoomPage from './object/RoomPage';

let shareLink = '';

test('creates a new room', async ({ page }) => {
	const creator = new RoomCreatorPage(page);
	await creator.load();
	await creator.submit();

	const room = new RoomPage(page);
	const a = room.getShareLink();
	const href = await a.getAttribute('href');
	const text = await a.textContent();
	expect(href).toBe(text);
	expect(href).toMatch(/^http:\/\/localhost:\d+\/\?id=\d+$/);
	shareLink = href;
});

test('opens the share link', async ({ page }) => {
	const room = new RoomPage(page);
	await room.load(shareLink);
	await page.screenshot({
		path: 'test/output/room-shared.png',
	});
});
