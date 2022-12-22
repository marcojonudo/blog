import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../objects/blog/post';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Url } from '../utils/url';
import { LocalStorageService } from './local-storage.service';
import { Comment } from '../objects/blog/comment';

@Injectable({
	providedIn: 'root'
})
export class BlogService {

	posts: Post[];
	post: Post;
	comments: Comment[];
	postsSubject: BehaviorSubject<Post[]>;
	posts$: Observable<Post[]>;
	postSubject: BehaviorSubject<Post>;
	post$: Observable<Post>;
	filterTextSubject: BehaviorSubject<string>;
	filterText$: Observable<string>;
	commentsSubject: Subject<Comment>;
	comments$: Observable<Comment>;

	constructor(private http: HttpClient) {
		const post = LocalStorageService.getItem('post');
		this.post = post ? new Post(post) : undefined;
		this.findPosts().subscribe((data: any[]) => {
			this.posts = data.map(p => new Post(p));
			this.postsSubject.next(this.posts);
		});
		this.postsSubject = new BehaviorSubject<Post[]>([]);
		this.posts$ = this.postsSubject.asObservable();
		this.postSubject = new BehaviorSubject<Post>(this.post);
		this.post$ = this.postSubject.asObservable();
		this.filterTextSubject = new BehaviorSubject<string>(undefined);
		this.filterText$ = this.filterTextSubject.asObservable();
		this.commentsSubject = new Subject<Comment>();
		this.comments$ = this.commentsSubject.asObservable();
	}

	findPosts(): Observable<Post[]> {
		return this.http.get(Url.posts()).pipe(
			map((posts: any[]) =>
				posts.map(post => new Post(post)).sort((a, b) => {
					if (a.date.isBefore(b.date)) { return 1; }
					if (a.date.isAfter(b.date)) { return -1; }
					return 0;
				})
			),
			tap(posts => {
				console.log('Posts', posts);
			})
		);
	}

	search(text: string): void {
		this.filterTextSubject.next(text);
	}

	selectPost(post: Post): void {
		this.post = post;
		LocalStorageService.setItem('post', this.post);
		this.postSubject.next(this.post);
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
