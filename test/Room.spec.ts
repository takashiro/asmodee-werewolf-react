import { Role } from '@asmodee/werewolf-core';
import { test, expect } from '@playwright/test';

import RoomPage from './gui/RoomPage';
import Form from './structure/Form';

let roomId = 0;

test.beforeAll(async ({ request }) => {
	const res = await request.post('api/room', {
		data: {
			roles: [
				Role.AlphaWolf,
				Role.Werewolf,
				Role.Werewolf,
				Role.Werewolf,
				Role.Villager,
				Role.Villager,
				Role.Villager,
				Role.Villager,
				Role.Seer,
				Role.Witch,
				Role.Hunter,
				Role.Magician,
			],
		},
	});
	const room = await res.json();
	expect(typeof room.id).toBe('number');
	roomId = room.id;
});

test.fixme('User 1', async ({ page }) => {
	const room = new RoomPage(page, roomId);
	const viewer = new Form(room.getMain());

	await test.step('opens the share link', async () => {
		await room.load();
		await page.screenshot({
			path: 'test/output/room-shared.png',
		});
	});

	await test.step('views seat 1', async () => {
		await viewer.getTextBox('座位号').fill('1');
		await viewer.getButton('查看身份').trigger();
		await viewer.screenshot({
			path: 'test/output/room-seat-1.png',
		});
	});

	await test.step('view seat 1 again', async () => {
		await page.reload();
		// const name = await viewer.getRoleText();
		await viewer.screenshot({
			path: 'test/output/room-seat-1-reopen.png',
		});
		// expect(name).toMatch(/^Seat 1/);
	});

	await test.step('switch a language', async () => {
		// const localeList = room.getLocaleList();
		// const button = localeList.getButton();
		// await button.click();
		// const japanese = localeList.getOption('ja');
		// await japanese.click();
		await page.screenshot({
			path: 'test/output/room-seat-1-ja.png',
			fullPage: true,
		});
		// const message = room.getInlineMessage();
		// expect(await message.textContent()).toContain('部屋番号');
	});

	// await context.close();
});
