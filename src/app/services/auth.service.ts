import { Injectable } from '@angular/core';
import {Cookie} from "ng2-cookies";
import {Observable} from "rxjs/Observable";
import "rxjs/add/observable/of";
//import {Cookie} from "ng2-cookies/ng2-cookies";
//import { Cookie } from 'ng2-cookies';

@Injectable()
export class AuthService {

  constructor() { }


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

  authUser(login: string, password: string): Observable<any>{
    Cookie.set("authorized","1");
    return Observable.of(true);
  }
  isAuth() : boolean{
    return Cookie.check('authorized');
  }

  logout(): void{
    Cookie.delete('authorized');
  }
}
