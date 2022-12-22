export class Style {

	property: string;
	value: string;
	div: string;

	constructor(div: string) {
		this.property = '';
		this.value = '';
		this.div = div;
	}

	isEmpty(): boolean {
		return this.property === '' && this.value === '';
	}

	isFilled(): boolean {
		return this.property !== '' && this.value !== '';
	}

	empty(): void {
		this.property = '';
		this.value = '';
	}

}
