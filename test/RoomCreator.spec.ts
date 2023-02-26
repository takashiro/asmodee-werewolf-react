import { test, expect } from '@playwright/test';

import RoomCreatorPage from './gui/RoomCreatorPage';
import Form from './structure/Form';

test.use({
	locale: 'zh-CN',
});

test.fixme('Create a room', async ({ page }) => {
	const creator = new RoomCreatorPage(page);
	await creator.load();

	await test.step('takes a screenshot', async () => {
		await page.screenshot({
			path: 'test/output/room-creator.png',
			fullPage: true,
		});
	});

	const form = new Form(creator.getMain());
	const werewolf = form.getSpinButton('狼人');
	const decreaseWerewolf = form.getButton('减少狼人');
	const increaseWerewolf = form.getButton('增加狼人');

	await test.step('displays a number input of werewolves', async () => {
		expect(await werewolf.getNumberValue()).toBe(4);
	});

	await test.step('decreases 1', async () => {
		await decreaseWerewolf.trigger();
		expect(await werewolf.getNumberValue()).toBe(3);
	});

	await test.step('cannot be smaller than 0', async () => {
		for (let i = 0; i < 10; i++) {
			await decreaseWerewolf.trigger();
		}
		expect(await werewolf.getNumberValue()).toBe(3);
	});

	await test.step('adds 3', async () => {
		for (let i = 0; i < 3; i++) {
			await increaseWerewolf.trigger();
		}
		expect(await werewolf.getNumberValue()).toBe(3);
	});

	await test.step('enables Alpha Wolf', async () => {
		const alphaWolf = form.getButton('狼王');
		expect(await alphaWolf.isPressed()).toBe(false);
		await alphaWolf.trigger();
		expect(await alphaWolf.isPressed()).toBe(true);
	});

	await test.step('disbles Idiot', async () => {
		const idiot = form.getButton('白痴');
		await idiot.trigger();
		expect(await idiot.isPressed()).toBe(false);
	});

	await test.step('enables Magician', async () => {
		const magician = form.getButton('魔术师');
		await magician.trigger();
		expect(await magician.isPressed()).toBe(true);
	});

	await test.step('creates a new room', async () => {
		await form.getButton('创建房间').trigger();
	});

	await test.step('sees a new room page', async () => {
		await page.screenshot({
			path: 'test/output/room-creator-done.png',
			fullPage: true,
		});
	});
});
