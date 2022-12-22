import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NavService } from '../../../services/nav.service';
import { Constants } from '../../../utils/constants';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-welcome',
	templateUrl: './welcome.component.html',
	styleUrls: ['./welcome.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class WelcomeComponent {

	@Input() palette: Palette;

	constructor(private navService: NavService) {}

	// region Getters / setters

	get normalUser(): string {
		return Constants.USER.NORMAL;
	}

	get devUser(): string {
		return Constants.USER.DEV;
	}

	// endregion

	selectUser(type: string): void {
		const user = this.navService.buildUser(type);
		this.navService.setUser(user);
	}

	checkSelectedUser(user: string, selectedUser: string = this.navService.user.type): boolean {
		return user === selectedUser;
	}

}
