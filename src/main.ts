import { enableProdMode, importProvidersFrom, isDevMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { AppRoutingModule } from './app/app-routing.module';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { userModalReducer } from './app/core/state/modal/user/modal.reducer';
import { orderModalReducer } from './app/core/state/modal/order/modal.reducer';

if (environment.production) {
  enableProdMode();
  //show this warning only on prod mode
  if (window) {
    selfXSSWarning();
  }
}
const initialReducers = {
  userModals: userModalReducer,
  orderModals: orderModalReducer
};

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(BrowserModule, AppRoutingModule),
    provideAnimations(),
    provideStore(initialReducers),
    provideEffects(),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
  ],
}).catch((err) => console.error(err));

function selfXSSWarning() {
  setTimeout(() => {
    console.log(
      '%c** STOP **',
      'font-weight:bold; font: 2.5em Arial; color: white; background-color: #e11d48; padding-left: 15px; padding-right: 15px; border-radius: 25px; padding-top: 5px; padding-bottom: 5px;',
    );
    console.log(
      `\n%cThis is a browser feature intended for developers. Using this console may allow attackers to impersonate you and steal your information sing an attack called Self-XSS. Do not enter or paste code that you do not understand.`,
      'font-weight:bold; font: 2em Arial; color: #e11d48;',
    );
  });
}
