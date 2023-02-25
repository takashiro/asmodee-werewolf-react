import Alert from '../window/Alert';
import Section from './Section';

export default class Landmark extends Section {
	getAlert() {
		return new Alert(this.getByRole('alert'));
	}
}
