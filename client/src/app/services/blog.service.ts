import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../objects/blog/post';
import { Observable, Subject, of } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { Comment } from '../objects/blog/comment';
import { Utils } from '../utils/utils';
import { MetaService } from './meta.service';
import { Title } from '@angular/platform-browser';
import { Constants } from '../utils/constants';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	comments: Comment[];
	posts$: Observable<Post[]>;
	posts: Post[];
	isPost$: Observable<boolean>;
	post$: Observable<Post>;
	commentsSubject: Subject<Comment>;
	comments$: Observable<Comment>;

	constructor(
		private http: HttpClient,
		private titleService: Title,
		private metaService: MetaService,
		@Inject(PLATFORM_ID) private platformId: string
	) {
		// this.createPostsObservable();
		this.commentsSubject = new Subject<Comment>();
		this.comments$ = this.commentsSubject.asObservable();
	}

	checkIsBlog(path: string, blogId: string = Constants.BLOG): boolean {
		return path === blogId;
	}

	createIsPostObservable(path$: Observable<string>): void {
		this.isPost$ = of(true); // path$.pipe(
			// map(path => !(this.checkIsBlog(path)))
		// );
	}

	createPostObservable(path$: Observable<string>): void {
		this.post$ = path$.pipe(
			filter(path => !this.checkIsBlog(path)),
			concatMap(path => this.findPost(path)),
			tap(post => this.findUpdateMetaObservable(post).subscribe())
		);
	}

	createPostsObservable(path$: Observable<string>, root: ActivatedRoute): void {
		this.posts$ = of('hola').pipe(
			tap(path => console.log('po', path)),
			filter(path => this.checkIsBlog(path)),
			concatMap(() => this.findPosts()),
			tap(() => this.findUpdateBlogMetaObservable(root).subscribe())
		);
		// this.posts$ = this.http.get(Url.posts()).pipe(
		// 	tap((posts: any[]) => console.log('received posts')),
		// 	map((posts: any[]) => posts.map(post => new Post(post))),
		// 	map((posts: Post[]) => Utils.sortPosts(posts)),
		// 	tap(posts => this.posts = posts)
		// );
	}

	findUpdateMetaObservable(post: Post): Observable<any> {
		return of(post).pipe(
			tap(p => this.titleService.setTitle(p.title)),
			map(p => this.metaService.findPostProperties(p)),
			tap(d => this.metaService.addTags(d))
		);
	}

	findUpdateBlogMetaObservable(root: ActivatedRoute): Observable<any> {
		return of(root).pipe(
			// map(r => this.findRouteChild(r)),
			tap(r => this.titleService.setTitle(r.snapshot.data.title)),
			map(r => this.metaService.findBlogProperties(r.snapshot.data)),
			tap(d => this.metaService.addTags(d))
		);
	}

	// findRouteChild(activatedRoute: ActivatedRoute) {
	// 	return activatedRoute.firstChild ? this.findRouteChild(activatedRoute.firstChild) : activatedRoute;
	// }

	findPost(path: string): Observable<Post> {
		return this.http.get(Url.post(path)).pipe(
			map(post => new Post(post)),
			catchError(e => {
				console.log('errorazo', e);
				return of(e);
			})
		);
	}

	findPosts(): Observable<Post[]> {
		console.log(2222);
		return this.http.get(Url.posts()).pipe(
			tap(() => console.log('received posts')),
			map((posts: any[]) => posts.map(post => new Post(post))),
			map((posts: Post[]) => Utils.sortPosts(posts)),
			tap(posts => this.posts = posts)
		);
	}

	findComments(postPath: string): Observable<any> {
		return this.http.get(Url.getComments(postPath)).pipe(
			tap(comments => {
				this.comments = comments.map(c => new Comment(c));
			})
		);
	}

	groupComments(comments: Comment[] = this.comments): Comment[] {
		const parents = comments.filter(c => !c.parent);
		const children = comments.filter(c => c.parent);
		this.fillReplies(parents, children);
		return parents;
	}

	fillReplies(parents: Comment[], children: Comment[]): void {
		const pending = [];
		children.forEach(c => {
			const parent = parents.find(p => p.equals(c.parent));
			if (parent) { parent.replies.push(c); }
			else { pending.push(c); }
		});
		if (pending.length) {
			const subParents = [].concat(...parents.map(c => c.replies)).filter(c => c);
			this.fillReplies(subParents, pending);
		}
	}

	uploadComment(comment: Comment, comments: Comment[] = this.comments): Observable<any> {
		comment.clearReplies();
		return this.http.post(Url.comments(), comment).pipe(
			map(c => {
				const savedComment = new Comment(c);
				if (comment.parent) {
					comment.parent.replies.push(savedComment);
				} else {
					comments.push(savedComment);
				}
				return savedComment;
			})
		);
	}

}
