import Component from './common/Component';

export default class RoleViewer extends Component {
	getInput() {
		return this.locator('input[type="number"]');
	}

	getButton() {
		return this.locator('button[type="button"]');
	}

	getRoleText() {
		return this.locator('.name').textContent();
	}
}
