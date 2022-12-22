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

	findProperties(post: Post, data: any, mePictureUrl: string = Constants.ME_PICTURE_URL): MetaProperties {
		console.log(post, data, mePictureUrl);
		return {
			type: post ? 'article' : 'website',
			title: post ? Utils.buildPostTitle(post.title) : data.title,
			description: post?.findDescription() ?? data.description,
			url: post ? Utils.buildPostUrl(post.path) : data.url,
			image: post?.headerImage ?? mePictureUrl
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
