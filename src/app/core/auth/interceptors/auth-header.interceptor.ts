import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { UserAuthToken, AUTH_REPLACE_HEADER } from '../types/user-auth-token';
import { switchMap } from 'rxjs/internal/operators/switchMap';
import { AuthenticationService } from '../services/authentication/authentication.service';

@Injectable()
export class AuthCheckInterceptor implements HttpInterceptor {
  constructor(private readonly authenticationServise: AuthenticationService) { }
  // tslint:disable-next-line: no-any
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authenticationServise.userAuthData$
      .pipe(
        take(1),
        switchMap((user: UserAuthToken | undefined) => next.handle(this.tryHandlers(request, user)))
      );
  }

  // tslint:disable-next-line: no-any
  tryHandlers = (request: HttpRequest<any>, user: UserAuthToken | undefined) => {
    let newRequest = request;

    if (!newRequest.headers.has(AUTH_REPLACE_HEADER)) { return newRequest; }
    let newHeaders = newRequest.headers.delete(AUTH_REPLACE_HEADER);

    const currentUser = user;
    if (currentUser && currentUser.userId && currentUser.xAuthToken) {
      newHeaders = newHeaders.set('Content-Type', 'application/json');
      newHeaders = newHeaders.set('X-UserId', currentUser.userId);
      newHeaders = newHeaders.set('X-Authorization', currentUser.xAuthToken);
    }

    newRequest = newRequest.clone({
      headers: newHeaders
    });

    return newRequest;
  };
}
