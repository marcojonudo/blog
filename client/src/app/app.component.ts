import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding
} from '@angular/core';
import { NavService } from './services/nav.service';
import { Constants } from './utils/constants';
import { AestheticsService } from './services/aesthetics.service';
import { Palette } from './objects/palette/palette';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [trigger('leaveAnimation', [
		transition(
			':leave',
			[
				style({ opacity: 1 }),
				animate('.3s', style({ opacity: 0 }))
			]
		)
	])]
})
export class AppComponent {
	title = 'portfolio';

	@HostBinding(`style.${Constants.PROPERTY.BACKGROUND_IMAGE}`) backgroundImage: string;
	@HostBinding(`style.${Constants.PROPERTY.COLOR}`) color: string;

	palette: Palette;

	constructor(private navService: NavService, private aestheticsService: AestheticsService, private cdRef: ChangeDetectorRef) {
		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
			this.backgroundImage = palette.buildBackgroundImage();
			this.color = palette.color;
		});
	}

}
