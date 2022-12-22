import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { BlogService } from '../../../services/blog.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from '../../../objects/users/user';
import { Section } from '../../../objects/sections/section';
import { WelcomeSection } from '../../../objects/sections/welcome-section';
import { AboutSection } from '../../../objects/sections/about-section';
import { SkillsSection } from '../../../objects/sections/skills-section';
import { BlogSection } from '../../../objects/sections/blog-section';
import { NotificationService } from '../../../services/notification.service';
import { Subscription } from 'rxjs';
import { Constants } from '../../../utils/constants';
import { Post } from '../../../objects/blog/post';
import { AestheticsService } from '../../../services/aesthetics.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Palette } from '../../../objects/palette/palette';
import { UntypedFormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { filter } from 'rxjs/operators';
import { SectionType } from '../../../objects/section-type';
import { MetaService } from '../../../services/meta.service';

@Component({
	selector: 'app-normal-nav',
	templateUrl: './normal-nav.component.html',
	styleUrls: ['./normal-nav.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.2s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.2s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class NormalNavComponent implements OnInit, OnDestroy {

	private readonly BUTTON_WIDTH_REM: number = 6;
	private readonly COLOR_SELECTOR_WIDTH_REM: number = 3.5;

	@Input() palette: Palette;

	navWidth: number;
	translateY: string;

	url: string;
	blog: boolean;
	post: boolean;
	filterTextControl: UntypedFormControl;

	private translateYSubscription: Subscription;

	constructor(
		public navService: NavService,
		private blogService: BlogService,
		private aestheticsService: AestheticsService,
		private router: Router,
		private titleService: Title,
		private metaService: MetaService,
		private cdRef: ChangeDetectorRef
	) {
		const fontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
		this.navWidth = (this.BUTTON_WIDTH_REM * Constants.SECTIONS + this.COLOR_SELECTOR_WIDTH_REM) * fontSize;
		this.filterTextControl = new UntypedFormControl('');
	}

	ngOnInit(): void {
		this.router.events.pipe(
			filter(e => e instanceof NavigationEnd)
		).subscribe((event: NavigationEnd) => {
			this.url = event.urlAfterRedirects;
			this.navService.transition = true;

			const route = this.findChild(this.router.routerState.root);

			const sectionType = SectionType.find(this.url);
			this.setVariables(sectionType.blog, sectionType.post);
			const routeTitle = sectionType.findTitle(route.snapshot.data.title, this.blogService.post?.title);
			sectionType.detectChanges(this.cdRef);

			this.titleService.setTitle(routeTitle);
			this.metaService.addTags(this.metaService.findProperties(this.findPost(), route.snapshot.data));
		});

		this.translateYSubscription = this.navService.translateY.asObservable().subscribe(translateY => {
			this.translateY = translateY;
			this.cdRef.detectChanges();
		});
	}

	findChild(activatedRoute: ActivatedRoute) {
		return activatedRoute.firstChild ? this.findChild(activatedRoute.firstChild) : activatedRoute;
	}

	setVariables(blog: boolean, post: boolean): void {
		this.navService.stickNav = blog;
		this.blog = blog;
		this.post = post;
	}

	findPost(post: Post = this.blogService.post, isPost: boolean = this.post): Post {
		return isPost ? post : undefined;
	}

	ngOnDestroy(): void {
		this.translateYSubscription.unsubscribe();
	}

	// region Getters / setters

	get blogUrl(): string {
		return Constants.URL.BLOG;
	}

	get user(): User {
		return this.navService.user;
	}

	get welcomeSection(): Section {
		return new WelcomeSection();
	}

	get aboutSection(): Section {
		return new AboutSection();
	}

	get skillsSection(): Section {
		return new SkillsSection();
	}

	get blogSection(): Section {
		return new BlogSection();
	}

	get palettes(): Palette[] {
		return this.aestheticsService.palettes;
	}

	// endregion

	findNavContainerTranslate(blog: boolean = this.blog, translateY: string = this.translateY): string {
		return `translateY(${blog ? 0 : translateY})`;
	}

	checkSelectedSection(section: Section, url: string = this.url, selectedSection: Section = this.navService.section): boolean {
		return url === Constants.URL.HOME && section.type === selectedSection.type;
	}

	selectSection(section: Section = this.welcomeSection): void {
		this.navigateTo(Constants.URL.HOME);
		this.navService.section = section;
		NotificationService.notifySection(this.navService.section);
	}

	navigateTo(path: string = this.blogUrl): void {
		this.router.navigate([path]);
	}

	checkHideSearchBar(blog: boolean = this.blog, post: boolean = this.post): boolean {
		return !blog || post;
	}

	search(text: string = this.filterTextControl.value): void {
		this.blogService.search(text);
	}

	findSelectedPost(): Post {
		return this.blogService.post;
	}

	findTranslatePaletteValue(i: number): number {
		const findSelectedIndex = this.palettes.indexOf(this.aestheticsService.palette);
		return (i - findSelectedIndex) * 100;
	}

	togglePalette(): void {
		this.aestheticsService.togglePalette();
	}

}
