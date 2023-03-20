import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
	enableProdMode();
}
console.log(1);
function bootstrap() {
	platformBrowserDynamic().bootstrapModule(AppModule)
		.catch(err => console.error(err));
}

console.log(2);
if (document.readyState === 'complete') {
	console.log(3);
	bootstrap();
} else {
	console.log(4);
	document.addEventListener('DOMContentLoaded', bootstrap);
}
