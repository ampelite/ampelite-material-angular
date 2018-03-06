import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

import { appConfig } from '../../app.config';

@Injectable()
export class AuthenticationService {

  constructor(private http: HttpClient) { }

  signin(username: string, password: string) {
    let res = this.http.post<any>(appConfig.apiUrl + '/Api/Auth/SignIn', { "userName": username, "password": password });

    return res.map(user => {
      if (user && user.access_token) {
        localStorage.setItem('currentUser', JSON.stringify(user));
      }

      return user;
    });
  }

  signout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
  }

}
