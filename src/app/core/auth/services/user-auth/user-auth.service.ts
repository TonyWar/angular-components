import { Injectable } from '@angular/core';
import { UserAuthToken, STORAGE_USER_TOKEN_KEY } from '../../types/user-auth-token';
import { NgForage, NgForageCache } from 'ngforage';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {
  constructor(
    private readonly http: HttpClient,
    private readonly ngf: NgForage,
    private readonly cache: NgForageCache,
  ) {}

  public async getUserDataFromStorage(): Promise<UserAuthToken | undefined> {
    try {
      const user: UserAuthToken = await this.ngf.getItem<UserAuthToken>(STORAGE_USER_TOKEN_KEY);

      return user;
    } catch (error) {
      return undefined;
    }
  }

  public async setUserData(user: UserAuthToken): Promise<boolean> {
    try {
      await this.ngf.setItem(STORAGE_USER_TOKEN_KEY, user);

      return true;
    } catch (error) {
      return false;
    }
  }

  public async clearUserData(): Promise<boolean> {
    try {
      await this.ngf.removeItem(STORAGE_USER_TOKEN_KEY);

      return true;
    } catch (error) {
      return false;
    }
  }
}
