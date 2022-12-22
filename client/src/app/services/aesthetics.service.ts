import { Injectable } from '@angular/core';
import { Palette } from '../objects/palette/palette';
import { LightBluePalette } from '../objects/palette/light-blue-palette';
import { DarkPalette } from '../objects/palette/dark-palette';
import { BehaviorSubject, Observable } from 'rxjs';
import { LightGreenPalette } from '../objects/palette/light-green-palette';

@Injectable({
	providedIn: 'root'
})
export class AestheticsService {

	palettes: Palette[];
	palette: Palette;
	paletteSubject: BehaviorSubject<Palette>;
	palette$: Observable<Palette>;

	constructor() {
		this.palettes = [new LightBluePalette(), new LightGreenPalette(), new DarkPalette()];
		this.palette = this.palettes[0];
		this.paletteSubject = new BehaviorSubject<Palette>(this.palette);
		this.palette$ = this.paletteSubject.asObservable();
	}

	findSelectedIndex(palette: Palette = this.palette, palettes: Palette[] = this.palettes): number {
		return palettes.indexOf(palette);

	}

	togglePalette(palettes: Palette[] = this.palettes): void {
		const findSelectedIndex = this.findSelectedIndex();
		const newIndex = (findSelectedIndex + 1) % palettes.length;
		this.palette = this.palettes[newIndex];
		this.paletteSubject.next(this.palette);
	}

}
