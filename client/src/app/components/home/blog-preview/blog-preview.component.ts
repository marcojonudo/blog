import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { Post } from '../../../objects/blog/post';
import { BlogService } from '../../../services/blog.service';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-blog-preview',
	templateUrl: './blog-preview.component.html',
	styleUrls: ['./blog-preview.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogPreviewComponent implements OnInit {

	@Input() palette: Palette;

	posts: Post[];

	constructor(private blogService: BlogService, public aestheticsService: AestheticsService, private cdRef: ChangeDetectorRef) {}

	ngOnInit(): void {
		this.blogService.posts$.subscribe(posts => {
			this.posts = posts.slice(0, 4);
			this.cdRef.detectChanges();
		});
	}

}
