import { test, expect } from '@playwright/test';

import RoomCreatorPage from './object/RoomCreatorPage';
import RoomPage from './object/RoomPage';

let shareLink = '';

test.beforeAll(async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	const creator = new RoomCreatorPage(page);
	await creator.load();
	await creator.submit();

	const creatorRoom = new RoomPage(page);
	const a = creatorRoom.getShareLink();
	const href = await a.getAttribute('href');
	const text = await a.textContent();
	expect(href).toBe(text);
	expect(href).toMatch(/^http:\/\/localhost:\d+\/\?id=\d+$/);
	shareLink = href;

	await context.close();
});

test('User 1', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	const room = new RoomPage(page);

	await test.step('opens the share link', async () => {
		await room.load(shareLink);
		await page.screenshot({
			path: 'test/output/room-shared.png',
		});
	});

	await test.step('views seat 1', async () => {
		const viewer = room.getRoleViewer();
		await viewer.getInput().fill('1');
		await viewer.getButton().click();
		await viewer.screenshot({
			path: 'test/output/room-seat-1.png',
		});
	});

	await test.step('view seat 1 again', async () => {
		await page.reload();
		const viewer = room.getRoleViewer();
		const name = await viewer.getRoleText();
		await viewer.screenshot({
			path: 'test/output/room-seat-1-reopen.png',
		});
		expect(name).toMatch(/^Seat 1/);
	});

	await test.step('switch a language', async () => {
		const localeList = room.getLocaleList();
		const button = localeList.getButton();
		await button.click();
		const japanese = localeList.getOption('ja');
		await japanese.click();
		await page.screenshot({
			path: 'test/output/room-seat-1-ja.png',
			fullPage: true,
		});
		const message = room.getInlineMessage();
		expect(await message.textContent()).toContain('部屋番号');
	});

	await context.close();
});
