import { Injectable } from '@angular/core';
import {TestGroup} from "./main/test-page/testGroup";
import {Observable} from "rxjs/Observable";
import {Constants} from "./Constants";
import {HttpClient} from "@angular/common/http";
import {GetTestsResponse} from "./services/GetTestsResponse";

@Injectable()
export class TestProcessService {

  constructor(private http: HttpClient) { }

  getTests() : Observable<TestGroup[]>{

   let response: Observable<GetTestsResponse> = this.http.get(Constants.SERVER_URL+"/server/api/v1/testProcess/getTests/");
   return response.map(response => {
     console.log('GET TESTS: ', response.testGroups);
     return response.testGroups;
   });

    //
    // let testTreeOld: TestGroup[] = [
    //   {
    //     group: "Authenticated Users",
    //     expanded: true,
    //     tests: [
    //       {
    //         name: "Read",
    //         enable: true
    //       },
    //       {
    //         name: "Modify",
    //         enable: true
    //       },
    //       {
    //         name: "Create",
    //         enable: false
    //       },
    //       {
    //         name: "Delete",
    //         enable: false
    //       }
    //     ]
    //   },
    //   {
    //     group: "Owners",
    //     expanded: true,
    //     tests: [
    //       {
    //         name: "Read",
    //         enable: true
    //       },
    //       {
    //         name: "Modify",
    //         enable: true
    //       },
    //       {
    //         name: "Create",
    //         enable: true
    //       },
    //       {
    //         name: "Delete",
    //         enable: true
    //       }
    //     ]
    //   }
    // ];
    //
    // return Observable.of(testTreeOld);
  }

}
