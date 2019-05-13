import { Injectable } from '@angular/core';
import { ReplaySubject, concat, Observable, of } from 'rxjs';
import { UserAuthToken } from '../../types/user-auth-token';
import { UserAuthService } from '../user-auth/user-auth.service';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public readonly userAuthData$: ReplaySubject<UserAuthToken | undefined>;
  constructor(
    private readonly userService: UserAuthService
  ) {
    this.userAuthData$ = new ReplaySubject<UserAuthToken | undefined>(1);
    // tslint:disable-next-line: no-floating-promises
    this.userService.getUserDataFromStorage()
      .then(userData => {
        this.userAuthData$.next(userData);
      });
  }

  async login(user: UserAuthToken): Promise<boolean> {
    this.userAuthData$.next(user);

    return this.userService.setUserData(user);
  }

  async logout(): Promise<boolean> {
    this.userAuthData$.next(undefined);

    return this.userService.clearUserData();
  }

  public checkAuth$(): Observable<boolean> {
    // tslint:disable-next-line: deprecation
    return concat(of(false), this.userAuthData$.pipe(map(user => !!user)));
  }
}
