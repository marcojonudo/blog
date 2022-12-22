import { User } from './user';
import { Style } from '../style';
import { Constants } from '../../utils/constants';

export class DevUser implements User {

	type: string;
	backgroundAttachment: string;

	constructor() {
		this.type = Constants.USER.DEV;
		this.backgroundAttachment = Constants.BACKGROUND_ATTACHMENT.SCROLL;
	}

	buildStyleObject(styles: Style[], div: string): { [key: string]: string } {
		const styleObject = {};
		if (styles.length && styles[0].div === div) {
			styles.forEach((style: Style) => {
				styleObject[style.property] = style.value;
			});
		}
		return styleObject;
	}

	init(): void {}

}
