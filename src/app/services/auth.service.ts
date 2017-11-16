import {Injectable} from '@angular/core';
import {Cookie} from "ng2-cookies";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthResponse} from "./authResponse";
//import {Cookie} from "ng2-cookies/ng2-cookies";
//import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthService {


  // login() {
  //   this.userService.authorization(this.model)
  //     .subscribe(
  //       data => {
  //         let result: Answer<any> = data;
  //
  //         if(this.responseService.isSuccess(result))
  //         {
  //           Cookie.set("authorization", result.responseBody.id, new Date(Date.now() + 3600 * 1000));
  //           this.router.navigate([this.returnUrl]);
  //         }
  //         else
  //         {
  //           this.responseService.handlerFatal(result);
  //           this.loading = false;
  //         }
  //       },
  //       error => {
  //         this.responseService.handlerError(error, this.router.url);
  //         this.loading = false;
  //       });
  // }

  private auth: boolean = false;


  constructor(private http: HttpClient) {
  }

  authUser(login: string, password: string): Observable<AuthResponse> {

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let body = JSON.stringify({login: login, password: password});

    let tst: Observable<AuthResponse> = this.http.post("http://localhost:8090/server/api/v1/user/auth", body, {headers: headers});

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
