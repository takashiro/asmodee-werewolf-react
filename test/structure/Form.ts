import Landmark from './Landmark';
import Button from '../widget/Button';
import TextBox from '../widget/TextBox';

export default class Form extends Landmark {
	getButton(name: string) {
		return new Button(this.getByRole('button', { name }));
	}

	getTextBox(name: string) {
		return new TextBox(this.getByRole('textbox', { name }));
	}
}
