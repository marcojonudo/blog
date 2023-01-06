import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{
		path: 'blog',
		data: {
			title: 'Marco - Blog',
			description: 'Welcome to my blog! Here I write about languages, frameworks and technologies'
		},
		loadChildren: () => import('./components/blog/blog.module').then(m => m.BlogModule)
	},
	{ path: '**', pathMatch: 'full', redirectTo: 'blog' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
	exports: [RouterModule]
})
export class AppRoutingModule {}
