import Structure from '../common/Structure';

export default class Section extends Structure {
	getRegion(name: string) {
		return new Section(this.getByRole('region', { name }));
	}

	getHeading(level?: number) {
		return this.getByRole('heading', { level });
	}
}
