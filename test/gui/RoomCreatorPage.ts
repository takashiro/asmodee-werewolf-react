import BasicPage from '../common/BasicPage';

export default class RoomCreatorPage extends BasicPage {
	override async load(): Promise<void> {
		await this.page.goto('/?page=room-creator');
	}
}
