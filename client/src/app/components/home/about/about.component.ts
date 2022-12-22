import {
	AfterViewInit,
	ChangeDetectionStrategy,
	ChangeDetectorRef,
	Component,
	ElementRef,
	Input,
	ViewChild
} from '@angular/core';
import { User } from '../../../objects/users/user';
import { fromEvent } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Palette } from '../../../objects/palette/palette';

@Component({
	selector: 'app-about',
	templateUrl: './about.component.html',
	styleUrls: ['./about.component.sass'],
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class AboutComponent implements AfterViewInit {

	@Input() user: User;
	@Input() palette: Palette;

	private readonly LEFT_CARD_UP = 'left-card-up';
	private readonly LEFT_CARD_DOWN = 'left-card-down';
	private readonly RIGHT_CARD_UP = 'right-card-up';
	private readonly RIGHT_CARD_DOWN = 'right-card-down';

	@ViewChild('pictureWrapper') pictureWrapper: ElementRef;
	@ViewChild('textWrapper') textWrapper: ElementRef;

	pictureWrapperUp: boolean;
	pictureWrapperClass: string;
	textWrapperClass: string;

	constructor(private cdRef: ChangeDetectorRef) {
		this.pictureWrapperUp = true;
	}

	ngAfterViewInit(): void {
		fromEvent(this.pictureWrapper.nativeElement, 'mouseover').pipe(
			tap(() => {
				if (!this.pictureWrapperUp) {
					this.toggleCardAnimations(this.LEFT_CARD_UP, this.RIGHT_CARD_DOWN);
				}
			})
		).subscribe();
		fromEvent(this.textWrapper.nativeElement, 'mouseover').pipe(
			tap(() => {
				if (this.pictureWrapperUp) {
					this.toggleCardAnimations(this.LEFT_CARD_DOWN, this.RIGHT_CARD_UP);
				}
			})
		).subscribe();
	}

	toggleCardAnimations(leftCardClass: string, rightCardClass: string): void {
		this.pictureWrapperClass = leftCardClass;
		this.textWrapperClass = rightCardClass;
		this.pictureWrapperUp = !this.pictureWrapperUp;
		this.cdRef.detectChanges();
	}

}
