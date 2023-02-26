import Section from './Section';

export default class List extends Section {
	getItem(index: number) {
		return this.getByRole('listitem').nth(index);
	}

	getItemText(index: number) {
		return this.getItem(index).textContent();
	}
}
