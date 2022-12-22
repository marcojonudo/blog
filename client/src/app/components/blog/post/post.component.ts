import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { BlogService } from '../../../services/blog.service';
import { Post } from '../../../objects/blog/post';
import { tap } from 'rxjs/operators';
import { Dayjs } from 'dayjs';
import { Constants } from '../../../utils/constants';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Comment } from '../../../objects/blog/comment';
import { Meta } from '@angular/platform-browser';

@Component({
	selector: 'app-post',
	templateUrl: './post.component.html',
	styleUrls: ['./post.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class PostComponent implements OnInit, AfterViewInit, OnDestroy {

	private readonly FIXED_IMAGE = 'fixed-image';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;

	postSubscription: Subscription;
	post: Post;
	parents: Comment[];
	translucentStyles: any;
	textBlockStyles: any;

	constructor(
		private blogService: BlogService,
		private aestheticsService: AestheticsService,
		private meta: Meta,
		private cdRef: ChangeDetectorRef
	) {
		this.postSubscription = this.findContent().subscribe(post => {
			this.post = post;
		});
		this.blogService.findComments(this.post.path).subscribe(() => {
			this.parents = this.buildGroupedComments();
			this.cdRef.detectChanges();
		});
		this.blogService.comments$.subscribe(() => {
			this.parents = this.buildGroupedComments();
			this.cdRef.detectChanges();
		});
	}

	ngOnInit(): void {
		this.aestheticsService.palette$.subscribe(palette => {
			this.translucentStyles = palette.buildTranslucentStyles();
			this.textBlockStyles = palette.buildTextBlockStyles();
			this.cdRef.detectChanges();
		});
	}

	ngAfterViewInit(): void {
		this.setParagraphStyle(Array.from(document.getElementsByTagName('p')));
		this.setImagesWidth(Array.from(document.images));
	}

	ngOnDestroy(): void {
		this.postSubscription.unsubscribe();
	}

	findBackgroundImage(url: string): string {
		return `url('${url}')`;
	}

	buildGroupedComments(): Comment[] {
		const parents = this.blogService.groupComments();
		console.log('Grouped comments', parents);
		return parents;
	}

	setParagraphStyle(paragraphs: any[]): void {
		paragraphs.forEach(paragraph => {
			if (paragraph.children.length === 1 && paragraph.children[0]['alt']) {
				paragraph.className = 'image-paragraph';
			}
		});
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

	findContent(): Observable<Post> {
		return this.blogService.post$.pipe(
			tap(post => console.log('Post', post))
		);
	}

	getDay(date: Dayjs = this.post.date): Date {
		return date.toDate();
	}

}
