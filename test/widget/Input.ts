import Widget from '../common/Widget';

export default class Input extends Widget {
	getValue() {
		return this.e.inputValue();
	}
}
