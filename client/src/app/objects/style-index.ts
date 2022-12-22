import { Style } from './style';

export class StyleIndex {

	style: Style;
	index: number;

	constructor(div: string, index: number = 0) {
		this.style = new Style(div);
		this.index = index;
	}

}
