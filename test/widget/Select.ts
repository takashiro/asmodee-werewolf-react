import { Locator } from '@playwright/test';

import { trigger } from '../common/Triggerable';
import Input from './Input';

export default abstract class Select extends Input {
	abstract getChild(name: string): Locator;

	select(name: string) {
		return trigger(this.getChild(name));
	}
}
