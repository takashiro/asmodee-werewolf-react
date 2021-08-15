import { Role } from '@asmodee/werewolf-core';

import NumberInput from '../pageObjects/NumberInput';
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

describe('Number Input', () => {
	let input: NumberInput;

	it('displays a number input of werewolves', async () => {
		input = await page.getWerewolfInput();
		expect(await input.getValue()).toBe(4);
	});

	it('decreases 1', async () => {
		await input.decrease();
		expect(await input.getValue()).toBe(3);
	});

	it('cannot be smaller than 0', async () => {
		for (let i = 0; i < 10; i++) {
			await input.decrease();
		}
		expect(await input.getValue()).toBe(0);
	});

	it('adds 3', async () => {
		for (let i = 0; i < 3; i++) {
			await input.increase();
		}
		expect(await input.getValue()).toBe(3);
	});
});

describe('Normal Roles', () => {
	it('enables Alpha Wolf', async () => {
		expect(await page.isRoleSelected(Role.AlphaWolf)).toBe(false);
		await page.toggleRole(Role.AlphaWolf);
		expect(await page.isRoleSelected(Role.AlphaWolf)).toBe(true);
	});

	it('disbles Idiot', async () => {
		await page.toggleRole(Role.Idiot);
		expect(await page.isRoleSelected(Role.Idiot)).toBe(false);
	});

	it('enables Magician', async () => {
		await page.toggleRole(Role.Magician);
		expect(await page.isRoleSelected(Role.Magician)).toBe(true);
	});
});
