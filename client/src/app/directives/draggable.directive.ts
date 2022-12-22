import { AfterViewInit, Directive, ElementRef, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Coordinates } from '../objects/coordinates';
import { NavService } from '../services/nav.service';
import { Constants } from '../utils/constants';

@Directive({
	selector: '[appDraggable]'
})
export class DraggableDirective implements OnInit, AfterViewInit, OnDestroy {

	public readonly LEFT_CLICK_BUTTON_ID: number = 0;

	private rect: any;

	private startCoordinates: Coordinates;
	private startEventCoordinates: Coordinates;
	private coordinates: Coordinates;

	private pointerDownListener: () => void;
	private pointerMoveListener: () => void;
	private pointerUpListener: () => void;

	private windowWidth: number;
	private windowHeight: number;

	constructor(
		private element: ElementRef,
		private renderer: Renderer2,
		private navService: NavService
	) {
		[this.windowWidth, this.windowHeight] = [100, 100]; // window.innerWidth, window.innerHeight];
	}

	ngOnInit() {
		if (!this.navService.checkSmallDevice()) {
			this.pointerDownListener = this.renderer.listen(
				this.element.nativeElement,
				Constants.EVENT.POINTER_DOWN,
				this.handleClick.bind(this)
			);
		}
	}

	ngAfterViewInit(): void {
		this.rect = this.element.nativeElement.getBoundingClientRect();
	}

	ngOnDestroy(): void {
		if (this.pointerMoveListener) {
			this.pointerMoveListener();
			this.pointerUpListener();
		}
	}

	handleClick(event: PointerEvent): void {
		if (event.button === this.LEFT_CLICK_BUTTON_ID) {
			this.initCoordinates(event);
			this.pointerMoveListener = this.renderer.listen(
				Constants.ELEMENT.DOCUMENT,
				Constants.EVENT.POINTER_MOVE,
				this.onPointerMove.bind(this)
			);
			this.pointerUpListener = this.renderer.listen(
				Constants.ELEMENT.DOCUMENT,
				Constants.EVENT.POINTER_UP,
				this.onPointerUp.bind(this)
			);
		}
	}

	initCoordinates(event: PointerEvent, rect: any = this.rect): void {
		if (!this.coordinates) {
			this.coordinates = new Coordinates(rect.left, rect.top);
		}
		this.startCoordinates = this.coordinates.clone();
		this.startEventCoordinates = new Coordinates(event.clientX, event.clientY);
	}

	onPointerMove(event: PointerEvent): void {
		this.coordinates = this.calcCoordinates(event);
		this.navService.move(this.coordinates);
	}

	calcCoordinates(event: PointerEvent): Coordinates {
		let x = this.startCoordinates.x + event.clientX - this.startEventCoordinates.x;
		let y = this.startCoordinates.y + event.clientY - this.startEventCoordinates.y;
		if (x <= 0) {
			x = 0;
		} else if (x + this.rect.width >= this.windowWidth) {
			x = this.windowWidth - this.rect.width;
		}
		if (y <= 0) {
			y = 0;
		} else if (y + this.rect.height >= this.windowHeight) {
			y = this.windowHeight - this.rect.height;
		}
		return new Coordinates(x, y);
	}

	onPointerUp(): void {
		this.pointerMoveListener();
		this.pointerUpListener();
	}

}
