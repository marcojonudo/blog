import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { Post } from '../../../objects/blog/post';
import { BlogService } from '../../../services/blog.service';
import { concatMap, switchMap } from 'rxjs/operators';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-blog',
	templateUrl: './blog.component.html',
	styleUrls: ['./blog.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent implements OnInit {

	posts: Post[];
	filterText: string;
	palette: Palette;

	constructor(
		private navService: NavService,
		private blogService: BlogService,
		private aestheticsService: AestheticsService,
		private cdRef: ChangeDetectorRef
	) {
		this.posts = [];
	}

	ngOnInit(): void {
		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
			this.cdRef.detectChanges();
		});
		this.blogService.posts$.pipe(
			switchMap(posts => {
				this.posts = posts;
				return this.blogService.filterText$;
			})
		).subscribe(filterText => {
			this.filterText = filterText;
			this.cdRef.detectChanges();
		});
	}

}
