import path from 'path';
import { ElementHandle, Locator } from '@playwright/test';
import { Role } from '@asmodee/werewolf-core';

import Page from './common/Page';
import NumberInput from './NumberInput';

export default class RoomCreatorPage extends Page {
	async load(): Promise<void> {
		await super.load();
		const button = this.locator('.lobby button').first();
		await button.click();
		await this.page.waitForSelector('.room-creator');
	}

	getWerewolfInput(): NumberInput {
		return this.getNumberInput(1);
	}

	getVillagerInput(): NumberInput {
		return this.getNumberInput(2);
	}

	async toggleRole(role: Role): Promise<void> {
		const button = await this.getRoleButton(role);
		await button.click();
	}

	async isRoleSelected(role: Role): Promise<boolean> {
		const button = await this.getRoleButton(role);
		if (!button) {
			return false;
		}

		const className = await button.getAttribute('class');
		const classNames = className.split(' ');
		return classNames.includes('selected');
	}

	async submit(): Promise<void> {
		const button = this.locator('.button-area button:nth-child(2)');
		await button.click();
	}

	protected async getRoleButton(role: Role): Promise<ElementHandle | null> {
		const buttons = await this.locator('.role-button').elementHandles();
		const roleKey = Role[role];
		for (const button of buttons) {
			const icon = await button.$('.role');
			const image = await icon.evaluate((e) => window.getComputedStyle(e).backgroundImage);
			if (!image) {
				continue;
			}

			const [, value] = image.match(/^url\(['"]?(.*?)['"]?\)$/);
			const basename = path.basename(value, '.jpg');
			if (basename === roleKey) {
				return button;
			}
		}
	}

	protected getNumberInput(boxIndex: number): NumberInput {
		const box = this.getBox(boxIndex);
		const selector = box.locator('.number-selector');
		return new NumberInput(selector);
	}

	protected getBox(index: number): Locator {
		return this.locator(`.box:nth-child(${index})`);
	}
}
