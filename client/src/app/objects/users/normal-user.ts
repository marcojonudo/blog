import {User} from './user';
import { NotificationService } from '../../services/notification.service';
import { Style } from '../style';
import { Constants } from '../../utils/constants';

export class NormalUser implements User {

	type: string;
	backgroundAttachment: string;

	constructor() {
		this.type = Constants.USER.NORMAL;
		this.backgroundAttachment = Constants.BACKGROUND_ATTACHMENT.FIXED;
	}

	buildStyleObject(styles: Style[], div: string): { [key: string]: string } {
		return div === Constants.STYLED_DIV.SCROLLABLE_CONTAINER ? { 'overflow-y': 'auto' } : {};
	}

	init(): void {
		NotificationService.notifyStyles([]);
	}

}
