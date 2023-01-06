import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavService } from '../../services/nav.service';
import { BlogService } from '../../services/blog.service';
import { Router } from '@angular/router';
import { Constants } from '../../utils/constants';
import { AestheticsService } from '../../services/aesthetics.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Palette } from '../../objects/palette/palette';
import { UntypedFormControl } from '@angular/forms';
import { startWith } from 'rxjs';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.sass'],
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
export class NavComponent {

	@Input() palette: Palette;

	filterTextControl: UntypedFormControl;

	constructor(
		public navService: NavService,
		public blogService: BlogService,
		private aestheticsService: AestheticsService,
		private router: Router
	) {
		this.filterTextControl = new UntypedFormControl('');
		this.navService.searchInput$ = this.filterTextControl.valueChanges.pipe(
			startWith('')
		);
		this.navService.createNavEventsObservable(this.router.events, router);
	}

	// region Getters / setters

	get blogUrl(): string {
		return Constants.URL.BLOG;
	}

	get palettes(): Palette[] {
		return this.aestheticsService.palettes;
	}

	// endregion

	navigateTo(path: string = this.blogUrl): void {
		this.router.navigate([path]);
	}

	findTranslatePaletteValue(i: number): number {
		const findSelectedIndex = this.palettes.indexOf(this.aestheticsService.palette);
		return (i - findSelectedIndex) * 100;
	}

	togglePalette(): void {
		this.aestheticsService.togglePalette();
	}

}
