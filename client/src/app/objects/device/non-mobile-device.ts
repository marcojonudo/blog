import {Device} from './device';

export class NonMobileDevice extends Device {

	constructor(stickNavThreshold: number) {
		super(stickNavThreshold);
	}

	findTranslateY(scrollTop: number): string {
		return `0`;
	}

}
