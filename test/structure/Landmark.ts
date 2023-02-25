import Structure from '../common/Structure';
import Alert from '../window/Alert';

export default class Landmark extends Structure {
	getAlert() {
		return new Alert(this.getByRole('alert'));
	}
}
