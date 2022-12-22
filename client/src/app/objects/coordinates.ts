export class Coordinates {

	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	clone(): Coordinates {
		return new Coordinates(this.x, this.y);
	}

}
