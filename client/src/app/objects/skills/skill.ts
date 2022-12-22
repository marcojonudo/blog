export class Skill {

	title: string;
	description: string;
	icon: string;

	constructor(title: string, description: string, icon: string) {
		this.title = title;
		this.description = description;
		this.icon = `${icon}.svg`;
	}

}
