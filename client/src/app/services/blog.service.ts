import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../objects/blog/post';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { concatMap, filter, map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { Comment } from '../objects/blog/comment';
import { Utils } from '../utils/utils';
import { MetaService } from './meta.service';
import { Title } from '@angular/platform-browser';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	comments: Comment[];
	posts$: Observable<Post[]>;
	isPost$: Observable<boolean>;
	post$: Observable<Post>;
	filterTextSubject: BehaviorSubject<string>; // TODO
	commentsSubject: Subject<Comment>;
	comments$: Observable<Comment>;

	constructor(
		private http: HttpClient,
		private titleService: Title,
		private metaService: MetaService
	) {
		this.createPostsObservable();
		this.commentsSubject = new Subject<Comment>();
		this.comments$ = this.commentsSubject.asObservable();
	}

	createIsPostObservable(path$: Observable<string>): void {
		this.isPost$ = path$.pipe(
			map(path => path !== 'blog')
		);
	}

	createPostObservable(path$: Observable<string>): void {
		this.post$ = path$.pipe(
			filter(path => path !== 'blog'),
			concatMap((path: string) => this.findPost(path)),
			map((post: any) => new Post(post)),
			tap(post => this.findUpdateMetaObservable(post).subscribe())
		);
	}

	createPostsObservable(): void {
		this.posts$ = this.http.get(Url.posts()).pipe(
			map((posts: any[]) => posts.map(post => new Post(post))),
			map((posts: Post[]) => Utils.sortPosts(posts)),
			tap(posts => console.log('Posts', posts))
		);
	}

	findUpdateMetaObservable(post: Post): Observable<any> {
		return of(post).pipe(
			tap(p => this.titleService.setTitle(p.title)),
			map(p => this.metaService.findPostProperties(p)),
			tap(d => this.metaService.addTags(d))
		);
	}

	findPost(path: string): Observable<Post> {
		return this.http.get(Url.post(path)).pipe(
			map(post => new Post(post)),
			tap(post => console.log('Post', post))
		);
	}

	search(text: string): void {
		this.filterTextSubject.next(text);
	}

	findComments(postPath: string): Observable<any> {
		return this.http.get(Url.getComments(postPath)).pipe(
			tap(comments => {
				this.comments = comments.map(c => new Comment(c));
				console.log('Comments', this.comments);
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
