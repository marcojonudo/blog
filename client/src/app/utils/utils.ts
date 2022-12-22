import { Constants } from './constants';

export class Utils {

	static remToPx(rem: number, fontSize: number) {
		return rem * fontSize;
	}

	static buildPostTitle(title: string) {
		return `Marco - ${title}`;
	}

	static buildPostUrl(path: string, domain: string = Constants.DOMAIN) {
		return `${domain}/blog/${path}`;
	}

}
