import path from 'path';
import { Role } from '@asmodee/werewolf-core';

import Page from './Page';
import NumberInput from './NumberInput';

type Element = ReturnType<WebdriverIO.Browser['$']>;
type ElementArray = ReturnType<WebdriverIO.Browser['$$']>;

export default class RoomCreatorPage extends Page {
	async open(): Promise<void> {
		await super.open();
		const button = await $('.lobby button');
		if (button) {
			await button.click();
			await this.loaded();
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
		if (button) {
			await button.click();
		}
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

	protected async getRoleButton(role: Role): Promise<Element | undefined> {
		const buttons = await this.$$('.role-button');
		const roleKey = Role[role].toLowerCase();
		for (const button of buttons) {
			const icon = await button.$('.role');
			const image = await icon.getCSSProperty('background-image');
			if (!image || !image.value) {
				continue;
			}

			const [, value] = image.value.match(/^url\(['"]?(.*?)['"]?\)$/);
			const basename = path.basename(value, '.jpg');
			if (basename === roleKey) {
				return button;
			}
		}
	}

	protected async getNumberInput(boxIndex: number): Promise<NumberInput> {
		const selector = await this.getBox(boxIndex).$('.number-selector');
		return new NumberInput(selector);
	}

	protected getBox(index: number): Element {
		return this.$(`.box:nth-child(${index})`);
	}

	protected $(selector: string): Element {
		return this.getRef().$(selector);
	}

	protected $$(selector: string): ElementArray {
		return this.getRef().$$(selector);
	}

	protected getRef(): Element {
		return $('.room-creator');
	}
}
