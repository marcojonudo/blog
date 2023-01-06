import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../objects/blog/post';
import { delay, tap } from 'rxjs/operators';
import { Dayjs } from 'dayjs';
import { Constants } from '../../../utils/constants';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Comment } from '../../../objects/blog/comment';
import { Meta } from '@angular/platform-browser';
import { NavService } from '../../../services/nav.service';
import { Router } from '@angular/router';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.1s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.5s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class PostComponent implements OnInit, OnDestroy {

	private readonly FIXED_IMAGE = 'fixed-image';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;

	post: Post;
	post$: Observable<Post>;
	post2$: Observable<any>;
	showSpinner = true;
	paletteSubscription: Subscription;
	parents: Comment[];
	translucentStyles: any;
	textBlockStyles: any;

	constructor(
		public blogService: BlogService,
		private navService: NavService,
		private router: Router,
		private aestheticsService: AestheticsService,
		private meta: Meta,
		private cdRef: ChangeDetectorRef
	) {
		this.showSpinner = true;
		this.blogService.post$.pipe(
			tap(post => this.post = post),
			delay(1000),
			tap(() => this.showSpinner = false),
			tap(() => this.cdRef.detectChanges())
		).subscribe();
	}

	ngOnInit(): void {
		this.paletteSubscription = this.aestheticsService.palette$.subscribe(palette => {
			this.translucentStyles = palette.buildTranslucentStyles();
			this.textBlockStyles = palette.buildTextBlockStyles();
			this.cdRef.detectChanges();
		});
	}

	ngOnDestroy(): void {
		this.paletteSubscription.unsubscribe();
	}

	findBackgroundImage(url: string): string {
		return `url('${url}')`;
	}

	buildGroupedComments(): Comment[] {
		return this.blogService.groupComments();
	}

	setImagesWidth(images: HTMLImageElement[]): void {
		images.forEach(image => {
			if (!image.className.includes(this.FIXED_IMAGE)) {
				const w = image.alt.split('.')[0].split('_').reverse()[0];
				const width = w && parseInt(w, 10) > 10 ? parseInt(w, 10) : 80;
				image.style.width = `${width}%`;
			}
		});
	}

	getDay(date: Dayjs): Date {
		return date.toDate();
	}

}
