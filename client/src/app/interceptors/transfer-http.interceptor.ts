import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor, HttpResponse
} from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';
import { makeStateKey, StateKey, TransferState } from '@angular/platform-browser';
import { isPlatformServer } from '@angular/common';
import { concatMap, filter, map } from 'rxjs/operators';

@Injectable()
export class TransferHttpInterceptor implements HttpInterceptor {

	private readonly STATE_KEY = 'stored_request';

	constructor(
		private transferState: TransferState,
		@Inject(PLATFORM_ID) private platformId: string
	) {}

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.method !== 'GET') {
			return next.handle(req);
		}

		const key = makeStateKey<HttpResponse<object>>(`${this.STATE_KEY}${req.url}`);
		return isPlatformServer(this.platformId) ?
			this.handleServerRequest(req, key, next) :
			this.handleBrowserRequest(req, key, next);
	}

	handleBrowserRequest(req: HttpRequest<any>, key: StateKey<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const cachedResponse = this.transferState.get(key, undefined);
		console.log('handle browser request', cachedResponse);
		if (cachedResponse) {
			this.transferState.remove(key);
			return of(new HttpResponse({
				body: cachedResponse,
				status: 200
			}));
		}
		return next.handle(req);
	}

	handleServerRequest(req: HttpRequest<any>, key: StateKey<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		console.log('handle server request', `http://blog-api:8090${req.url}`);
		return of(req).pipe(
			map(r => this.isCompleteUrl(r.url) ? r : r.clone({ url: `http://blog-api:8090${r.url}` })),
			concatMap(r => next.handle(r)),
			filter(event => event instanceof HttpResponse),
			filter((response: HttpResponse<any>) => response.status === 200),
			tap((response: HttpResponse<any>) => {
				console.log('setting transfer state');
				this.transferState.set(key, response.body);
			})
		);
	}

	isCompleteUrl(url: string): boolean {
		return url.startsWith('http');
	}

}
