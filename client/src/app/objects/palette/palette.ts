export class Palette {

	color: string;
	textColor: string;
	backgroundColor: string;
	textBackgroundColor: string;
	translucidBackgroundColor: string;
	darkTranslucidBackgroundColor: string;

	constructor(
		color: string,
		textColor: string,
		backgroundColor: string,
		textBackgroundColor: string,
		translucidBackgroundColor: string,
		darkTranslucidBackgroundColor: string
	) {
		this.color = color;
		this.textColor = textColor;
		this.backgroundColor = backgroundColor;
		this.textBackgroundColor = textBackgroundColor;
		this.translucidBackgroundColor = translucidBackgroundColor;
		this.darkTranslucidBackgroundColor = darkTranslucidBackgroundColor;
	}

	buildBackgroundImage(): string {
		return `linear-gradient(${this.backgroundColor} 0%, ${this.backgroundColor} 100%), url('/assets/img/tiles-background.gif')`;
	}

	buildTranslucentStyles(dark: boolean = false): any {
		return {
			'background-color': dark ? this.darkTranslucidBackgroundColor : this.translucidBackgroundColor,
			color: '#fff',
			'box-shadow': '0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
			transition: 'color .2s, background-color .2s, width .2s, transform .2s'
		};
	}

	buildTextBlockStyles(dark: boolean = false): any {
		return {
			'background-color': this.textBackgroundColor,
			color: this.color,
			'box-shadow': '0 3px 3px -2px rgba(0, 0, 0, 0.2), 0 3px 4px 0 rgba(0, 0, 0, 0.14), 0 1px 8px 0 rgba(0, 0, 0, 0.12)',
			transition: 'color .2s, background-color .2s'
		};
	}

}
