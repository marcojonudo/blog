import * as dayjs from 'dayjs';
import { Dayjs } from 'dayjs';

export class Comment {

	name: string;
	email: string;
	message: string;
	date: Dayjs;
	replies: Comment[];

	postPath: string;
	parent: Comment;

	constructor(comment: any) {
		this.name = comment.name;
		this.email = comment.email;
		this.date = dayjs.utc(comment.date);
		this.message = comment.message;
		this.postPath = comment.postPath;
		this.parent = comment.parent ? new Comment(comment.parent) : undefined;
		this.replies = [];
	}

	equals(comment: Comment): boolean {
		return this.email === comment.email && this.date.isSame(comment.date);
	}

	clearReplies(): void {
		this.replies = [];
		if (this.parent) {
			this.parent.clearReplies();
		}
	}

}
