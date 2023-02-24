import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: User | null = null;
  authStateChange$ = new Subject<User>();
  constructor(private http: HttpClient) {}

  login(user: User) {
    return this.http.post<{ user: User }>(
      environment.API_URL + '/auth/login',
      user
    );
  }

  register(user: User) {
    return this.http.post<{ user: User }>(
      environment.API_URL + '/auth/register',
      user
    );
  }

  authStateChange() {
    this.authStateChange$.next(this.user!);
  }

  saveToLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
    const expiresAt = moment().add('1', 'day');
    localStorage.setItem('expires_at', JSON.stringify(expiresAt.valueOf()));
    setTimeout(() => {
      this.logout();
    }, 86400000);
    this.authStateChange();
  }

  autoLogin() {
    const expiresAt = this.getExpiration();
    if (!moment().isBefore(expiresAt)) {
      this.logout();
      return;
    }
    const timer = expiresAt!.valueOf() - moment().valueOf();
    setTimeout(() => {
      this.logout();
    }, timer);

    if (localStorage.getItem('user')) {
      const user: User = JSON.parse(localStorage.getItem('user') || '{}');
      if (user) {
        this.user = user;
      }
    }
  }

  logout() {
    this.user = null;
    localStorage.removeItem('user');
    localStorage.removeItem('expires_at');
    this.authStateChange();
  }

  getUser() {
    return this.user;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    if (!expiration) {
      return null;
    }
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }
}
