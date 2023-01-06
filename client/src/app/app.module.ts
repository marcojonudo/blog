import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogComponent } from './components/blog/blog/blog.component';
import { PostCardComponent } from './components/blog/post-card/post-card.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostComponent } from './components/blog/post/post.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TitlePipe } from './pipes/title.pipe';
import { NavComponent } from './components/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewCommentComponent } from './components/new-comment/new-comment.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommentComponent } from './components/comment/comment.component';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
import { MatIconModule } from '@angular/material/icon';
import { DateSortPipe } from './pipes/date-sort.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
	declarations: [
		AppComponent,
		BlogComponent,
		PostCardComponent,
		PostComponent,
		TitlePipe,
		NavComponent,
		NewCommentComponent,
		CommentComponent,
		DateSortPipe,
		SpinnerComponent
	],
	imports: [
		BrowserModule.withServerTransition({ appId: 'serverApp' }),
		AppRoutingModule,
		InfiniteScrollModule,
		FormsModule,
		HttpClientModule,
		MarkdownModule.forRoot({ loader: HttpClient }),
		BrowserAnimationsModule,
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
		MatIconModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule {

	constructor() {
		dayjs.extend(utc);
		dayjs.extend(timezone);
	}

}
