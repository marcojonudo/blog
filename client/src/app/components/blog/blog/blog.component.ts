import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { Post } from '../../../objects/blog/post';
import { BlogService } from '../../../services/blog.service';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';
import { Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

	posts: Post[];
	posts$: Observable<Post[]>;
	palette: Palette;

	constructor(
		public blogService: BlogService,
		private navService: NavService,
		private aestheticsService: AestheticsService,
		private cdRef: ChangeDetectorRef
	) {
		this.posts$ = this.navService.searchInput$.pipe(
			switchMap(text => this.findPostsObservable(text))
		);
	}

	ngOnInit(): void {
		this.aestheticsService.palette$.subscribe(palette => { // TODO
			this.palette = palette;
			this.cdRef.detectChanges();
		});
	}

	findPostsObservable(filterText: string, localPosts: Post[] = this.posts): Observable<Post[]> {
		return (localPosts ? of(localPosts) : this.blogService.posts$).pipe(
			tap(posts => this.posts = this.posts ?? posts),
			map(posts => posts.filter(p => p.title.toLowerCase().includes(filterText.toLowerCase())))
		);
	}

}
