import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	static setItem(key, value): void {
		localStorage.setItem(key, JSON.stringify(value));
	}

	static getItem(key): any {
		const item = localStorage.getItem(key);
		return item ? JSON.parse(item) : undefined;
	}

}
