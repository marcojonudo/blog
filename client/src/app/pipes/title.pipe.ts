import {Pipe, PipeTransform} from '@angular/core';
import {Post} from '../objects/blog/post';

@Pipe({
	name: 'title'
})
export class TitlePipe implements PipeTransform {

	transform(posts: Post[], titleFilter: string): Post[] {
		return titleFilter ? posts.filter(p => p.title.toLowerCase().includes(titleFilter.toLowerCase())) : posts;
	}

}
