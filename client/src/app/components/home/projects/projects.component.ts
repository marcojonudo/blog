import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Constants } from '../../../utils/constants';

@Component({
	selector: 'app-projects',
	templateUrl: './projects.component.html',
	styleUrls: ['./projects.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProjectsComponent {

	selectedProject: any;
	projects: any[];

	get zowiApp(): string {
		return Constants.PROJECT.ZOWIAPP;
	}

	get fallApp(): string {
		return Constants.PROJECT.FALLAPP;
	}

	get panel(): string {
		return Constants.PROJECT.PANEL;
	}

	get schedules(): string {
		return Constants.PROJECT.SCHEDULES;
	}

	checkSelectedProject(project: string, selectedProject: string = this.selectedProject): boolean {
		return project === selectedProject;
	}

}
