import { Locator } from '@playwright/test';

import Page from './common/Page';
import RoleViewer from './RoleViewer';

export default class RoomPage extends Page {
	async load(path = '.'): Promise<void> {
		await super.load(path);
		await this.page.waitForSelector('.room');
	}

	getShareLink(): Locator {
		return this.locator('.room .share-link-area a');
	}

	getRoleViewer(): RoleViewer {
		return new RoleViewer(this.locator('.room .role-viewer'));
	}
}
