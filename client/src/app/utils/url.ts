import { environment } from '../../environments/environment';

export class Url {

	static posts(): string {
		console.log('url posts', `${environment.serverUrl}/posts`);
		return `${environment.serverUrl}/posts`;
	}

	static post(path: string): string {
		console.log('url post', path, `${environment.serverUrl}/posts/${path}`);
		return `${environment.serverUrl}/posts/${path}`;
	}

	static comments(): string {
		return `${environment.serverUrl}/comments`;
	}

	static getComments(postPath: string): string {
		return `${environment.serverUrl}/comments/${postPath}`;
	}

}
