import { Constants } from './constants';
import { Post } from '../objects/blog/post';

export class Utils {

	static remToPx(rem: number, fontSize: number) {
		return rem * fontSize;
	}

	static buildPostTitle(title: string) {
		return `Marco - ${title}`;
	}

	static buildBlogUrl(domain: string = Constants.DOMAIN) {
		return `${domain}/blog`;
	}

	static buildPostUrl(path: string) {
		return `${this.buildBlogUrl()}/${path}`;
	}

	static sortPosts(posts: Post[]): Post[] {
		return posts.sort((a, b) => {
			if (a.date.isBefore(b.date)) { return -1; }
			if (a.date.isAfter(b.date)) { return 1; }
			return 0;
		});
	}

}
