import { HostListener, Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Section } from '../objects/sections/section';
import { User } from '../objects/users/user';
import { NormalUser } from '../objects/users/normal-user';
import { WelcomeSection } from '../objects/sections/welcome-section';
import { AboutSection } from '../objects/sections/about-section';
import { SkillsSection } from '../objects/sections/skills-section';
import { BlogSection } from '../objects/sections/blog-section';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Device } from '../objects/device/device';
import { SmallWidthDevice } from '../objects/device/small-width-device';
import { MediumWidthDevice } from '../objects/device/medium-width-device';
import { DevUser } from '../objects/users/dev-user';
import { Coordinates } from '../objects/coordinates';
import { Constants } from '../utils/constants';
import { Utils } from '../utils/utils';
import { DimensionsService } from './dimensions.service';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
	providedIn: 'root'
})
export class NavService {

	private readonly USER_BUILDER: { [key: string]: User } = {};

	user: User;
	userSubject: Subject<User>;
	user$: Observable<User>;

	sections: Section[];
	section: Section;

	screenHeight: number;
	device: Device;
	translateY: BehaviorSubject<string>;
	translateY$: Observable<string>;
	stickNav: boolean;
	transition: boolean;
	sectionTops: number[];

	fontSize: number;

	coordinatesSubject: Subject<Coordinates>;
	coordinates$: Observable<Coordinates>;

	constructor(
		@Inject(PLATFORM_ID) private platformId: any,
		private dimensionsService: DimensionsService
	) {
		// setTimeout(
		// 	() => {
		// 		console.log(window);
		// 	},
		// 	2000
		// );
		this.screenHeight = 100; // isPlatformBrowser(platformId) ? dimensionsService.window.innerWidth : window.innerWidth;

		this.USER_BUILDER[Constants.USER.NORMAL] = new NormalUser();
		this.USER_BUILDER[Constants.USER.DEV] = new DevUser();

		this.user = this.USER_BUILDER[Constants.USER.NORMAL];
		this.userSubject = new Subject<User>();
		this.user$ = this.userSubject.asObservable();

		this.sections = [new WelcomeSection(), new AboutSection(), new SkillsSection(), new BlogSection()];
		this.section = this.sections[0];
		this.sectionTops = [];

		this.translateY = new BehaviorSubject<string>(undefined);
		this.translateY$ = this.translateY.asObservable();

		this.fontSize = 16; // parseFloat(getComputedStyle(document.documentElement).fontSize);

		this.coordinatesSubject = new Subject<Coordinates>();
		this.coordinates$ = this.coordinatesSubject.asObservable();
	}

	buildUser(type: string, userBuilder: { [key: string]: User } = this.USER_BUILDER): User {
		return userBuilder[type];
	}

	checkSmallDevice(): boolean {
		return window.innerWidth < Constants.SCREEN_WIDTH_THRESHOLD;
	}

	findDevice(screenHeight: number, sectionSelectorOffset: number): Device {
		return this.checkSmallDevice() ? new SmallWidthDevice(screenHeight) : new MediumWidthDevice(sectionSelectorOffset);
	}

	setSection(index: number): Section {
		this.section = this.sections[index];
		return this.section;
	}

	setDevice(sectionSelectorOffset: number, screenHeight: number = this.screenHeight): void {
		this.device = this.findDevice(screenHeight, sectionSelectorOffset);
		this.setTranslateY(this.device.findTranslateY(0));
	}

	setTranslateY(translateY: string): void {
		this.translateY.next(translateY);
	}

	scroll(scrollTop: number): void {
		this.handleSectionScroll(scrollTop);

		this.transition = false;
		this.stickNav = this.device.checkStickNav(scrollTop);
		this.setTranslateY(this.device.findTranslateY(scrollTop));
	}

	handleSectionScroll(scrollTop: number, fontSize: number = this.fontSize): void {
		const navScrollTop = scrollTop + Utils.remToPx(Constants.NAV_HEIGHT_REM, fontSize);
		const topSections = this.sectionTops.filter(top => navScrollTop >= (top - this.screenHeight / 2));
		const sectionIndex = this.sectionTops.indexOf(topSections[topSections.length - 1]);
		this.setSection(sectionIndex);
	}

	setUser(user: User): void {
		this.user = user;
		this.user.init();
		this.userSubject.next(user);
	}

	move(coordinates: Coordinates): void {
		this.coordinatesSubject.next(coordinates);
	}

}
