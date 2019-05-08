import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injectable, ErrorHandler } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import * as Sentry from '@sentry/browser';

Sentry.init({
  dsn: 'https://5a30e60c30024fe8a5e948a8360bb21e@sentry.io/1455289'
});

@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  // tslint:disable-next-line: no-any
  handleError(error: any): void {
    Sentry.captureException(error.originalError || error);
    throw error;
  }
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
