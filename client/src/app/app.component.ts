import {
	ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding
} from '@angular/core';
import { NotificationService } from './services/notification.service';
import { Section } from './objects/sections/section';
import { User } from './objects/users/user';
import { NormalUser } from './objects/users/normal-user';
import { WelcomeSection } from './objects/sections/welcome-section';
import { NavService } from './services/nav.service';
import { Device } from './objects/device/device';
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

	user: User;
	section: Section;
	device: Device;
	palette: Palette;
	showSplash: boolean;

	constructor(private navService: NavService, private aestheticsService: AestheticsService, private cdRef: ChangeDetectorRef) {
		this.user = new NormalUser();
		this.section = new WelcomeSection();
		this.device = this.navService.device;
		this.showSplash = true;
		NotificationService.init();

		this.navService.user$.subscribe(user => {
			this.user = user;
		});
		this.aestheticsService.palette$.subscribe(palette => {
			this.palette = palette;
			this.backgroundImage = palette.buildBackgroundImage();
			this.color = palette.color;
		});
		setTimeout(
			() => {
				this.showSplash = false;
				this.cdRef.detectChanges();
			},
			Constants.SPLASH_DURATION * 1000
		);
	}

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	checkUser(type: string, user: User = this.user): boolean {
		return type === user.type;
	}

}
