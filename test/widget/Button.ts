import Command from './Command';

export default class Button extends Command {
	async isPressed(): Promise<boolean> {
		const pressed = await this.e.getAttribute('aria-pressed');
		return pressed === 'true';
	}
}
