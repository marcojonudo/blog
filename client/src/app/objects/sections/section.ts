export abstract class Section {

	type: string;
	x: number;
	y: number;

	protected constructor(type: string, x: number, y: number) {
		this.type = type;
		this.x = x;
		this.y = y;
	}

	buildTranslateProperty(x: number = this.x, y: number = this.y): string {
		return `translate3d(${x}%, ${y}%, 0)`;
	}

}
