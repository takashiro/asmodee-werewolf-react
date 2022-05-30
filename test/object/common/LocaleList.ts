import Component from './Component';

export default class LocaleList extends Component {
	getButton() {
		return this.e;
	}

	toggle() {
		return this.getButton().click();
	}

	getPopupMenu() {
		return this.locator('ul');
	}

	getOption(lang: string) {
		return this.getPopupMenu().locator(`li:lang(${lang})`);
	}
}
