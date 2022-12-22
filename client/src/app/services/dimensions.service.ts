import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class DimensionsService {

	width: number;
	height: number;

	get window(): any {
		return window;
	}

}
