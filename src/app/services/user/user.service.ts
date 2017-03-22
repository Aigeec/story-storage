import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { LocalStorageService } from 'angular-2-local-storage';

const AUTH_TOKEN = 'auth_token';

const headers = new Headers();
headers.append('Content-Type', 'application/json');

@Injectable()
export class UserService {

  private loggedIn = null;
  private token: string;

  constructor(private http: Http, private localStorageService: LocalStorageService) { }

  private serverRequest(route, username, password) {
    return this.http
      .post(
      route,
      JSON.stringify({ username, password }),
      { headers }
      ).map((res) => res.json())
      .map((res) => {
        this.loggedIn = res.status;
        this.localStorageService.set('token', res.token);
        return this.loggedIn;
      });
  }

  register(username, password) {
    return this.serverRequest('/register', username, password);
  }

  login(username, password) {
    return this.serverRequest('/login', username, password);
  }

  logout() {
    this.loggedIn = false;
  }

  isLoggedIn() {
    this.loggedIn = this.loggedIn || !!this.localStorageService.get('token');
    return Observable.of(this.loggedIn);
  }

}
