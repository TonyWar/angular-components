import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { delay } from 'rxjs/internal/operators/delay';
import { scan } from 'rxjs/internal/operators/scan';
import { retryWhen } from 'rxjs/internal/operators/retryWhen';

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor() { }
  // tslint:disable-next-line: no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        // delay(3000), // use for test slow requests
        retryWhen(errors => errors.pipe(
          delay(1000),
          tap((errorStatus) => {
            if (!(errorStatus.status.toString()).startsWith('5')) {
              throw errorStatus;
            }
            console.log('Retrying...');
          }),
          scan((count, currenError) => {
            if (count > 2) {
              throw currenError;
            } else {
              return count + 1;
            }
          }, 0),
        ))
      );
  }
}
