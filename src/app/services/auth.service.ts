import {Injectable} from '@angular/core';
import {Cookie} from "ng2-cookies";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "./authResponse";
import {Constants} from "../Constants";

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  authUser(login: string, password: string): Observable<AuthResponse> {


    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({login: login, password: password});

    let tst: Observable<AuthResponse> = this.http.post(Constants.SERVER_URL+"/server/api/v1/user/auth", body, {headers: headers});

    return tst.map(authResponse => {
        if (authResponse.isAuth) {
          Cookie.set("authorized", "1");
        }
        return authResponse;
      });
  }

  isAuth(): boolean {
    return Cookie.check('authorized');
  }

  logout(): void {
    Cookie.delete('authorized');
  }
}
