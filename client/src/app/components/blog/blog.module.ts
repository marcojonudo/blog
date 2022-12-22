import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BlogRoutingModule} from './blog-routing.module';
import {MarkdownModule} from 'ngx-markdown';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		BlogRoutingModule,
		MarkdownModule.forChild()
	]
})
export class BlogModule {}
