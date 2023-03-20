import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { MetaService } from './meta.service';
import { BlogService } from './blog.service';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	path$: Observable<string>;
	searchInput$: Observable<string>;

	constructor(
		private titleService: Title,
		private metaService: MetaService,
		private blogService: BlogService
	) {}

	createNavEventsObservable(events: Observable<any>, router: Router): void {
		this.path$ = events.pipe(
			filter(e => e instanceof NavigationEnd),
			tap(e => console.log('event', e)),
			map(e => e.urlAfterRedirects),
			map(url => url.split('/')),
			map(paths => paths[paths.length - 1]),
			tap(url => console.log('path$ final path', url))
			// tap(p => p === 'blog' ? this.handleBlogUpdate(router).subscribe() : undefined)
		);
		// this.blogService.createIsPostObservable(this.path$);
		this.blogService.createPostObservable(this.path$);
		// this.blogService.createPostsObservable(this.path$, this.findRouteChild(router.routerState.root));
	}

	handleBlogUpdate(router: Router): Observable<any> {
		return of(router.routerState.root).pipe(
			map(r => this.findRouteChild(r)),
			tap(r => this.titleService.setTitle(r.snapshot.data.title)),
			map(r => this.metaService.findBlogProperties(r.snapshot.data)),
			tap(d => this.metaService.addTags(d))
		);
	}

	findRouteChild(activatedRoute: ActivatedRoute) {
		return activatedRoute.firstChild ? this.findRouteChild(activatedRoute.firstChild) : activatedRoute;
	}

}
