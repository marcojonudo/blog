import {Dayjs} from 'dayjs';
import * as dayjs from 'dayjs';

export class Post {

	title: string;
	author: string;
	content: string;
	date: Dayjs;
	headerImage: string;
	logo: string;
	color: string;
	path: string;

	constructor(post: any) {
		this.title = post.title;
		this.author = post.author;
		this.content = post.content;
		this.date = dayjs(post.date);
		this.headerImage = post.headerImage;
		this.logo = post.logo;
		this.color = post.color;
		this.path = post.path;
	}

	findDescription(content: string = this.content) {
		return content.split('\n')[0];
	}

}
