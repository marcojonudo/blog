import { Constants } from '../utils/constants';
import { ChangeDetectorRef } from '@angular/core';

export class SectionType {

	private static all: { [name: string]: SectionType } = {};

	static readonly HOME = new SectionType(
		'HOME',
		(url: string) => !url.includes(Constants.URL.BLOG),
		false,
		false,
		(routeTitle: string) => routeTitle,
		(cdRef: ChangeDetectorRef) => undefined
	);
	static readonly BLOG = new SectionType(
		'BLOG',
		(url: string) => url === Constants.URL.BLOG,
		true,
		false,
		(routeTitle: string) => routeTitle,
		(cdRef: ChangeDetectorRef) => cdRef.detectChanges()
	);
	static readonly POST = new SectionType(
		'POST',
		(url: string) => url !== Constants.URL.BLOG,
		true,
		true,
		(routeTitle: string, postTitle: string) => postTitle,
		(cdRef: ChangeDetectorRef) => cdRef.detectChanges()
	);

	id: string;
	check: (url: string) => SectionType;
	blog: boolean;
	post: boolean;
	findTitle: (routeTitle: string, postTitle: string) => string;
	detectChanges: (cdRef: ChangeDetectorRef) => void;

	constructor(id: string, check: any, blog: boolean, post: boolean, findTitle: any, detectChanges: any) {
		this.id = id;
		this.check = check;
		this.blog = blog;
		this.post = post;
		this.findTitle = findTitle;
		this.detectChanges = detectChanges;
		SectionType.all[id] = this;
	}

	static parse(id: string): SectionType {
		return SectionType.all[id];
	}

	static find(url: string): SectionType {
		return Object.values(SectionType.all).find(t => t.check(url));
	}

}
