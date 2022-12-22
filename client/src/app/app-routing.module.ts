import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';

const routes: Routes = [
	{
		path: 'home',
		data: {
			title: 'Marco - Freelance software developer',
			description: 'I\'m Marco, an experienced full stack developer who provides professional and top quality software development services!'
		},
		component: HomeComponent
	},
	{
		path: 'blog',
		data: {
			title: 'Marco - Blog',
			description: 'Welcome to my blog! Here I write about languages, frameworks and technologies'
		},
		loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
	},
	{ path: '**', pathMatch: 'full', redirectTo: 'home' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabledBlocking'
})],
	exports: [RouterModule]
})
export class AppRoutingModule {}
