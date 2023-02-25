import { test } from '@playwright/test';
// import { Role } from '@asmodee/werewolf-core';

import RoomCreatorPage from './gui/RoomCreatorPage';

test.fixme('Create a room', async ({ page }) => {
	const creator = new RoomCreatorPage(page);
	await creator.load();

	await test.step('takes a screenshot', async () => {
		await page.screenshot({
			path: 'test/output/room-creator.png',
			fullPage: true,
		});
	});

	// let input: NumberInput;

	await test.step('displays a number input of werewolves', async () => {
		// input = creator.getWerewolfInput();
		// expect(await input.getValue()).toBe(4);
	});

	await test.step('decreases 1', async () => {
		// await input.decrease();
		// expect(await input.getValue()).toBe(3);
	});

	await test.step('cannot be smaller than 0', async () => {
		// for (let i = 0; i < 10; i++) {
		// 	await input.decrease();
		// }
		// expect(await input.getValue()).toBe(0);
	});

	await test.step('adds 3', async () => {
		// for (let i = 0; i < 3; i++) {
		// 	await input.increase();
		// }
		// expect(await input.getValue()).toBe(3);
	});

	await test.step('enables Alpha Wolf', async () => {
		// expect(await creator.isRoleSelected(Role.AlphaWolf)).toBe(false);
		// await creator.toggleRole(Role.AlphaWolf);
		// expect(await creator.isRoleSelected(Role.AlphaWolf)).toBe(true);
	});

	await test.step('disbles Idiot', async () => {
		// await creator.toggleRole(Role.Idiot);
		// expect(await creator.isRoleSelected(Role.Idiot)).toBe(false);
	});

	await test.step('enables Magician', async () => {
		// await creator.toggleRole(Role.Magician);
		// expect(await creator.isRoleSelected(Role.Magician)).toBe(true);
	});

	await test.step('creates a new room', async () => {
		// await creator.submit();
	});

	await test.step('sees a new room page', async () => {
		await page.screenshot({
			path: 'test/output/room-creator-done.png',
			fullPage: true,
		});
	});
});
