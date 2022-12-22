import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef, OnDestroy,
	OnInit,
	QueryList,
	ViewChild,
	ViewChildren
} from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { User } from '../../../objects/users/user';
import { Section } from '../../../objects/sections/section';
import { Style } from '../../../objects/style';
import { NotificationService } from '../../../services/notification.service';
import { NavService } from '../../../services/nav.service';
import { Constants } from '../../../utils/constants';
import { Utils } from '../../../utils/utils';
import { AestheticsService } from '../../../services/aesthetics.service';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('welcome', { read: ElementRef }) welcome: ElementRef;
	@ViewChild('scrollableContainerElem') scrollableContainerElem: ElementRef;
	@ViewChildren('sectionElem', { read: ElementRef }) sectionElements: QueryList<ElementRef>;

	private styleIndexSubscription: Subscription;
	private sectionSubscription: Subscription;

	private readonly USER_STYLE_BUILDER: any;

	sectionSelectorOffset: number;
	scrollTop: number;

	palette: Palette;
	styles: Style[];

	constructor(
		private navService: NavService,
		private aestheticsService: AestheticsService,
		private cdRef: ChangeDetectorRef
	) {
		this.styles = [];
		this.scrollTop = 0;

		this.USER_STYLE_BUILDER = {};
		this.USER_STYLE_BUILDER[Constants.USER.NORMAL] = (section: Section) => section.buildTranslateProperty();
		this.USER_STYLE_BUILDER[Constants.USER.DEV] = (section: Section) => section.buildTranslateProperty();
	}

	ngOnInit(): void {
		this.styleIndexSubscription = NotificationService.styles$.subscribe((styles: Style[]) => {
			this.styles = styles;
			this.cdRef.detectChanges();
		});
		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
		});
	}

	ngAfterViewInit(): void {
		const margin = Constants.WELCOME_ITEM_MARGIN * this.navService.fontSize;
		setTimeout(
			() => {
				const welcomeBottom = this.welcome.nativeElement.getBoundingClientRect().bottom;
				this.sectionSelectorOffset = welcomeBottom + margin;

				this.navService.setDevice(this.sectionSelectorOffset);
				this.navService.sectionTops = this.sectionElements.toArray().map(elem => elem.nativeElement.getBoundingClientRect().top);

				this.sectionSubscription = NotificationService.section$.subscribe((section: Section) => {
					this.scrollToSection(section);
				});
			},
			0
		);

		fromEvent(this.scrollableContainerElem.nativeElement, Constants.EVENT.SCROLL).subscribe((event: any) => {
			this.handleScroll(event);
		});
		this.cdRef.detectChanges();
	}

	ngOnDestroy(): void {
		this.styleIndexSubscription.unsubscribe();
		this.sectionSubscription.unsubscribe();
	}

	// region Getters / setters

	get user(): User {
		return this.navService.user;
	}

	get screenHeight(): number {
		return this.navService.screenHeight;
	}

	get scrollableContainer(): string {
		return Constants.STYLED_DIV.SCROLLABLE_CONTAINER;
	}

	get sectionsContainer(): string {
		return Constants.STYLED_DIV.SECTIONS_CONTAINER;
	}

	// endregion

	scrollToSection(
		section: Section,
		sections: Section[] = this.navService.sections,
		sectionTops: number[] = this.navService.sectionTops
	): void {
		const sectionIndex = sections.findIndex(s => s.type === section.type);
		this.scrollableContainerElem.nativeElement.scrollTop =
			sectionTops[sectionIndex] - Utils.remToPx(Constants.NAV_HEIGHT_REM, this.navService.fontSize);
	}

	buildStyleObject(
		div: string, user: User = this.navService.user, section: Section = this.navService.section, styles: Style[] = this.styles
	): { [key: string]: string } {
		return user.buildStyleObject(styles, div);
	}

	handleScroll(event: any): void {
		this.scrollTop = event.target.scrollTop;
		this.navService.scroll(this.scrollTop);
	}

}
