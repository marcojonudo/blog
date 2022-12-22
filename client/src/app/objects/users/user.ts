import { Style } from '../style';

export interface User {

	type: string;
	backgroundAttachment: string;

	buildStyleObject(styles: Style[], div: string): { [key: string]: string };

	init(): void;

}
