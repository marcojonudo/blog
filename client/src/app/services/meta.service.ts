import { Injectable } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { Post } from '../objects/blog/post';
import { Utils } from '../utils/utils';
import { Constants } from '../utils/constants';

export interface MetaProperties {

	type: string;
	title: string;
	description: string;
	url: string;
	image: string;

}

@Injectable({
	providedIn: 'root'
})
export class MetaService {

	constructor(private meta: Meta) {}

	findBlogProperties(data: any, mePictureUrl: string = Constants.ME_PICTURE_URL): MetaProperties {
		return {
			type: 'website',
			title: data.title.replace(/[`*]/g, ''),
			description: data.description.replace(/[`*]/g, ''),
			url: Utils.buildBlogUrl(),
			image: mePictureUrl
		};
	}

	findPostProperties(post: Post): MetaProperties {
		return {
			type: 'article',
			title: Utils.buildPostTitle(post.title),
			description: post.findDescription(),
			url: Utils.buildPostUrl(post.path),
			image: post.headerImage
		};
	}

	addTags({ type, title, description, url, image }: MetaProperties): void {
		this.meta.updateTag({ name: 'description', content: description });
		this.meta.updateTag({ name: 'og:type', content: type });
		this.meta.updateTag({ name: 'og:title', content: title });
		this.meta.updateTag({ name: 'og:url', content: url });
		this.meta.updateTag({ name: 'og:description', content: description });
		this.meta.updateTag({ name: 'og:image', content: image });
		this.meta.updateTag({ name: 'twitter:title', content: title });
		this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
		this.meta.updateTag({ name: 'twitter:description', content: description });
		this.meta.updateTag({ name: 'twitter:image', content: image });
	}

}
