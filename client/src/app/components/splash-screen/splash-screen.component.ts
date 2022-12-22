import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
	selector: 'app-splash-screen',
	templateUrl: './splash-screen.component.html',
	styleUrls: ['./splash-screen.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class SplashScreenComponent {}
