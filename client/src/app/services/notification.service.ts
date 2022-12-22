import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Style } from '../objects/style';
import { Section } from '../objects/sections/section';
import { WelcomeSection } from '../objects/sections/welcome-section';

@Injectable({
	providedIn: 'root'
})
export class NotificationService {

	private static stylesSubject: Subject<Style[]>;
	static styles$: Observable<Style[]>;

	private static sectionSubject: BehaviorSubject<Section>;
	static section$: Observable<Section>;

	// endregion

	static init() {
		this.stylesSubject = new Subject<Style[]>();
		this.styles$ = this.stylesSubject.asObservable();

		this.sectionSubject = new BehaviorSubject<Section>(new WelcomeSection());
		this.section$ = this.sectionSubject.asObservable();
	}

	public static notifyStyles(styles: Style[]): void {
		this.stylesSubject.next(styles);
	}

	public static notifySection(section: Section): void {
		this.sectionSubject.next(section);
	}

}
