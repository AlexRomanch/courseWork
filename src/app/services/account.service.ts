import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import {PersonalAccountData} from "../main/personal-account/PersonalAccountData";
import {TypicalResponse} from "./typicalResponse";

@Injectable()
export class AccountService {

  constructor(private http: HttpClient) { }

  getPersonalAccountData(userId: number): Observable<PersonalAccountData>{
    return this.http.get("http://localhost:8090/server/api/v1/user/personalAccount/" + userId);
  }

  updateAccountData(personalAccountData: PersonalAccountData): Observable<TypicalResponse>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    //let body = JSON.stringify(personalAccountData);

    return this.http.post("http://localhost:8090/server/api/v1/user/updateAccountData", personalAccountData, {headers: headers});
  }
}
