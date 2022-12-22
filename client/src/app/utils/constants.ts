export class Constants {

	static readonly WELCOME_ITEM_MARGIN: number = 1.5;
	static readonly SECTIONS: number = 4;
	static readonly NAV_HEIGHT_REM: number = 3.5;
	static readonly MOBILE_STICK_NAV_THRESHOLD: number = 200;
	static readonly SCREEN_WIDTH_THRESHOLD: number = 600;
	static readonly SPLASH_DURATION: number = 1.5;
	static readonly DOMAIN = 'https://marcomartinezavila.com';
	static readonly ME_PICTURE_URL = 'https://marcomartinezavila.s3.eu-west-1.amazonaws.com/me.jpg';

	static readonly USER: any = {
		NORMAL: 'NORMAL',
		DEV: 'DEV'
	};

	static readonly SECTION: any = {
		WELCOME: 'welcome',
		ABOUT: 'about',
		SKILLS: 'skills',
		BLOG: 'blog'
	};

	static readonly PROJECT: any = {
		FALLAPP: 'FALLAPP',
		ZOWIAPP: 'ZOWIAPP',
		PANEL: 'PANEL',
		SCHEDULES: 'SCHEDULES'
	};

	static readonly EVENT: any = {
		SCROLL: 'scroll',
		POINTER_DOWN: 'pointerdown',
		POINTER_MOVE: 'pointermove',
		POINTER_UP: 'pointerup'
	};

	static readonly NAVBAR_INFO: any = {
		USER: 'USER',
		SECTION: 'SECTION',
		STICK: 'STICK',
		TRANSLATE: 'TRANSLATE',
		INFO: 'INFO'
	};

	static readonly URL: any = {
		HOME: '/home',
		BLOG: '/blog'
	};

	static ELEMENT: any = {
		DOCUMENT: 'document'
	};

	static OVERFLOW: any = {
		AUTO: 'auto',
		HIDDEN: 'hidden'
	};

	static BACKGROUND_ATTACHMENT: any = {
		FIXED: 'fixed',
		SCROLL: 'scroll'
	};

	static STYLED_DIV: any = {
		SCROLLABLE_CONTAINER: 'scrollable-container',
		SECTIONS_CONTAINER: 'sections-container'
	};

	static PROPERTY: any = {
		BACKGROUND_IMAGE: 'background-image',
		COLOR: 'color'
	};

}
