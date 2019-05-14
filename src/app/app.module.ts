import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './core/components/component/app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerErrorInterceptor } from './core/auth/interceptors/server-error.interceptor';
import { AuthCheckInterceptor } from './core/auth/interceptors/auth-header.interceptor';
import { SentryErrorHandler } from './develop/sentry/setry.error-handler';
import { CustomFormsModule } from './form/custom-forms/custom-forms.module';
import { FormModule } from './form/form.module';
import { ControlsModule } from './UX/controls/controls.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CustomFormsModule,
    ReactiveFormsModule,
    FormModule,
    ControlsModule,
  ],
  providers: [
    { provide: ErrorHandler, useClass: SentryErrorHandler },
    { provide: HTTP_INTERCEPTORS, useClass: ServerErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthCheckInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
