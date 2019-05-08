import * as Sentry from '@sentry/browser';
import { Injectable, ErrorHandler } from '@angular/core';

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