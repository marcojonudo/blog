import { environment } from '../../environments/environment';

export class Url {

	static posts(): string {
		return `${environment.serverUrl}/posts`;
	}

	static comments(): string {
		return `${environment.serverUrl}/comments`;
	}

	static getComments(postPath: string): string {
		return `${environment.serverUrl}/comments/${postPath}`;
	}

}
