import { trigger } from '../common/Triggerable';
import Widget from '../common/Widget';

export default class Command extends Widget {
	trigger() {
		return trigger(this.e);
	}
}
