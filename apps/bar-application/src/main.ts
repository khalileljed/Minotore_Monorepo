import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

//Enables Production mode if it's not enabled yet (by another widget, by the widget-dependencies,etc...)
if (environment.production) {
  try {
    enableProdMode();
  } catch (e) {
  }
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
