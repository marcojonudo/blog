export abstract class Device {

	stickNavThreshold: number;

	protected constructor(stickNavThreshold: number) {
		this.stickNavThreshold = stickNavThreshold;
	}

	abstract findTranslateY(scrollTop: number): string;

	checkStickNav(scrollTop: number): boolean {
		return scrollTop > this.stickNavThreshold;
	}

}
