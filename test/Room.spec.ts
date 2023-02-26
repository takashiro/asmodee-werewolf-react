import { Role } from '@asmodee/werewolf-core';
import { test, expect } from '@playwright/test';

import RoomPage from './gui/RoomPage';
import Form from './structure/Form';
import Menu from './widget/Menu';

let roomId = 0;

test.use({
	locale: 'zh-CN',
});

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

test('User 1', async ({ browser }) => {
	const context = await browser.newContext();
	const page = await context.newPage();
	const room = new RoomPage(page, roomId);
	const main = room.getMain();
	const contentinfo = room.getContentInfo();
	const viewer = main.getRegion('你的身份');

	await test.step('opens the share link', async () => {
		await room.load();
		await page.screenshot({
			path: 'test/output/room-shared.png',
		});
	});

	await test.step('views seat 1', async () => {
		const form = new Form(viewer);
		await form.getSpinButton('座位号').fill('1');
		await form.getButton('查看身份').trigger();
		await viewer.screenshot({
			path: 'test/output/room-seat-1.png',
		});
	});

	await test.step('view seat 1 again', async () => {
		await page.reload();
		await viewer.screenshot({
			path: 'test/output/room-seat-1-reopen.png',
		});
		expect(await viewer.textContent()).toContain('1号位');
	});

	await test.step('switch a language', async () => {
		const form = new Form(contentinfo);
		await form.getButton('切换语言').trigger();

		const menu = new Menu(contentinfo.getByRole('menu', { name: '切换语言' }));
		await menu.select('日本語');
		await page.screenshot({
			path: 'test/output/room-seat-1-ja.png',
			fullPage: true,
		});

		const message = await main.textContent();
		expect(message).toContain('部屋番号');
	});
});
