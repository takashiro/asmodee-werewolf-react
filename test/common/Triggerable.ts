import { Locator } from '@playwright/test';

export const enum TriggerAction {
	Click = 'click',
	Space = 'space',
	Enter = 'enter',
}

const action = process.env.TRIGGER_ACTION ?? TriggerAction.Click;

export async function trigger(e: Locator): Promise<void> {
	switch (action) {
	case TriggerAction.Click:
		await e.click();
		break;
	case TriggerAction.Space:
		await e.press('Space');
		break;
	case TriggerAction.Enter:
		await e.press('Enter');
		break;
	default:
		break;
	}
}
