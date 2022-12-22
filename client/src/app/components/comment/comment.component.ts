import { ChangeDetectionStrategy, Component, HostBinding, Input } from '@angular/core';
import { Comment } from '../../objects/blog/comment';
import { Post } from '../../objects/blog/post';
import { animate, style, transition, trigger } from '@angular/animations';
import { Dayjs } from 'dayjs';

@Component({
	selector: 'app-comment',
	templateUrl: './comment.component.html',
	styleUrls: ['./comment.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.3s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.3s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class CommentComponent {

	@Input() post: Post;
	@Input() comment: Comment;
	@Input() translucentStyles: any;

	@HostBinding('class.reply') @Input() reply: boolean;

	newComment: boolean;

	findDate(date: Dayjs): Date {
		return date.toDate();
	}

	openReplyForm(): void {
		this.newComment = true;
	}

	closeForm(): void {
		this.newComment = false;
	}

}
