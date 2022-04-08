import path from 'path';
import { Role } from '@asmodee/werewolf-core';

import Page from './common/Page';
import NumberInput from './NumberInput';
import WebElement from './common/WebElement';

export default class RoomCreatorPage extends Page {
	async load(): Promise<void> {
		await super.load();
		const button = await this.$('.lobby button');
		if (button) {
			await button.click();
			await this.page.waitForSelector('.room-creator');
		}
	}

	getWerewolfInput(): Promise<NumberInput> {
		return this.getNumberInput(1);
	}

	getVillagerInput(): Promise<NumberInput> {
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
		const button = await this.$('.button-area button:nth-child(2)');
		await button.click();
	}

	protected async getRoleButton(role: Role): Promise<WebElement | null> {
		const buttons = await this.$$('.role-button');
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

	protected async getNumberInput(boxIndex: number): Promise<NumberInput> {
		const box = await this.getBox(boxIndex);
		const selector = await box?.$('.number-selector');
		return selector && new NumberInput(selector);
	}

	protected getBox(index: number): Promise<WebElement | null> {
		return this.$(`.box:nth-child(${index})`);
	}
}
