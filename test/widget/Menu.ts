import { Locator } from '@playwright/test';
import Select from './Select';

export default class Menu extends Select {
	override getChild(name: string): Locator {
		return this.getByRole('menuitem', { name });
	}
}
