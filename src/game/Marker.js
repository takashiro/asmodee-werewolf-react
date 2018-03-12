
let MarkerId = 0;

class Marker {

	constructor(key, name) {
		this.id = MarkerId++;
		this.key = key;
		this.name = name;
		Marker[key] = this;
	}

}

new Marker('Invalid', '无效');

export default Marker;
