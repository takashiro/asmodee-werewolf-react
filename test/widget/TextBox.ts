import Input from './Input';

export default class TextBox extends Input {
	fill(value: string) {
		return this.e.fill(value);
	}
}
