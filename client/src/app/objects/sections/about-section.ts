import { Section } from './section';
import { Constants } from '../../utils/constants';

export class AboutSection extends Section {

	constructor() {
		super(Constants.SECTION.ABOUT, 0, -100);
	}

}
