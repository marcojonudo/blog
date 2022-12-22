import { Device } from './device';
import { Constants } from '../../utils/constants';

export class SmallWidthDevice extends Device {

	screenHeight: number;

	constructor(screenHeight: number) {
		super(Constants.MOBILE_STICK_NAV_THRESHOLD);
		this.screenHeight = screenHeight;
	}

	findTranslateY(scrollTop: number): string {
		return this.checkStickNav(scrollTop) ? `calc(${this.screenHeight}px - 100%)` : `${this.screenHeight}px`;
	}

}
