import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, Input } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { StyleIndex } from '../../objects/style-index';
import { NavService } from '../../services/nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Coordinates } from '../../objects/coordinates';
import { animate, style, transition, trigger } from '@angular/animations';
import { Constants } from '../../utils/constants';
import { Palette } from '../../objects/palette/palette';

@Component({
	selector: 'app-style-editor',
	templateUrl: './style-editor.component.html',
	styleUrls: ['./style-editor.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [
		trigger('inOutAnimation', [
			transition(
				':enter',
				[
					style({ opacity: 0 }),
					animate('.2s', style({ opacity: 1 }))
				]
			),
			transition(
				':leave',
				[
					style({ opacity: 1 }),
					animate('.2s', style({ opacity: 0 }))
				]
			)
		])
	]
})
export class StyleEditorComponent {

	@HostBinding('class.opened') opened: boolean;

	@Input() palette: Palette;

	styles: StyleIndex[];
	addedStyles: StyleIndex[];
	styledDivs: string[];
	selectedDiv: string;
	coordinates: Coordinates;

	constructor(private navService: NavService, private sanitizer: DomSanitizer, private cdRef: ChangeDetectorRef) {
		this.addedStyles = [];
		this.styledDivs = Object.values(Constants.STYLED_DIV);
		this.selectedDiv = this.styledDivs[0];
		this.styles = [new StyleIndex(this.selectedDiv)];

		this.coordinates = new Coordinates();
		this.navService.coordinates$.subscribe(coordinates => {
			this.coordinates = coordinates;
			this.cdRef.detectChanges();
		});
	}

	findTransform(): string {
		return `translate3d(${this.coordinates.x}px, ${this.coordinates.y}px, 0)`;
	}

	toggleOpened(): void {
		this.opened = !this.opened;
	}

	updateDiv(selectedDiv: string = this.selectedDiv, styles: StyleIndex[] = this.styles): void {
		styles.forEach(style => {
			style.style.div = selectedDiv;
		});
		NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	checkDisabledTrash(styleIndex: StyleIndex): boolean {
		return styleIndex.index === 0 && styleIndex.style.isEmpty();
	}

	setProperty(style: StyleIndex): void {
		style.style.property = document.getElementById(`property-elem-${style.index}`).innerHTML;
		this.handleStyle(style);
	}

	setValue(style: StyleIndex): void {
		style.style.value = document.getElementById(`value-elem-${style.index}`).innerHTML;
		this.handleStyle(style);
	}

	handleStyle(
		style: StyleIndex,
		styles: StyleIndex[] = this.styles,
		addedStyles: StyleIndex[] = this.addedStyles,
		selectedDiv: string = this.selectedDiv
	): void {
		if (style.style.isEmpty()) {
			if (style.index < styles.length - 1) {
				this.removeStyle(style.index);
			}
		} else if (style.style.isFilled()) {
			const addedStyle = addedStyles.find(s => s.style === style.style);
			if (!addedStyle) {
				styles.push(new StyleIndex(selectedDiv, styles.length));
				addedStyles.push(style);
			}
		}
		NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyleFromTrash(style: StyleIndex, styles: StyleIndex[] = this.styles, selectedDiv: string = this.selectedDiv): void {
		/* Si se aprieta la papelera y sólo hay un elemento, no se debe eliminar, sino vaciar */
		if (styles.length === 1) {
			/* Para evitar problemas de actualizaciones de la interfaz, en lugar de vaciar el contenido, se reemplaza por un style vacío */
			styles.splice(0, 1, new StyleIndex(selectedDiv, 0));
		} else {
			this.removeStyle(style.index);
		}
		NotificationService.notifyStyles(styles.map(s => s.style).slice(0, styles.length - 1));
	}

	removeStyle(index: number, styles: StyleIndex[] = this.styles): void {
		styles.splice(index, 1);
		for (let i = index; i < styles.length; i++) {
			styles[i].index -= 1;
		}
	}

}
