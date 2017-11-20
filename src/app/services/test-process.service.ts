import { Injectable } from '@angular/core';
import {TestGroup} from "../main/test-page/testGroup";
import {Observable} from "rxjs/Observable";
import {Constants} from "../Constants";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {GetTestsResponse} from "./GetTestsResponse";
import {StartTestProcessRequest} from "./StartTestProcessRequest";
import {TypicalResponse} from "./typicalResponse";
import {TestProcessInfo} from "./TestProcessInfo";
import {TestObject} from "../main/test-page/testObject";

@Injectable()
export class TestProcessService {

  constructor(private http: HttpClient) { }

  getTests() : Observable<TestGroup[]>{

   let response: Observable<GetTestsResponse> = this.http.get(Constants.SERVER_URL+"/server/api/v1/testProcess/getTests/");
   return response.map(response => {
     //console.log('GET TESTS: ', response.testGroups);
     return response.testGroups;
   });
  }

  startTestProcess(testGroups: TestGroup[]): Observable<number> {
    if(!testGroups){
      return;
    }

    let request : StartTestProcessRequest = new StartTestProcessRequest();
    let res: TestGroup[]  = [];


    // находим выбранные тесты
    for(let group of testGroups){

      let grp :TestGroup = new TestGroup();
      grp.group = group.group;

      for(let test of group.tests){
        if(test.enable){
          grp.addTest(test);
        }
      }

      if(grp.hasTests()){
        res.push(grp);
      }
    }

    request.testGroups = res;
    //console.log(request);

    let headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    let resp : Observable<TypicalResponse> = this.http.post(Constants.SERVER_URL+"/server/api/v1/testProcess/startTestProcess", request, {headers: headers});
    return resp.map(response => {
      if(response.comments !== null){
        return +response.comments;
      }
      return null;
    });

  }

  pollTestProcess(sessionId : number): Observable<TestProcessInfo>{
    //let response: Observable<GetTestsResponse> = this.http.get(Constants.SERVER_URL+"/server/api/v1/testProcess/getProcessInfo/" + sessionId);
    //console.log('get process info: ',sessionId);
    return this.http.get(Constants.SERVER_URL+"/server/api/v1/testProcess/getProcessInfo/" + sessionId);
  }

  mergeResults(origin: TestGroup[], readyTests: TestObject[]) : TestGroup[]{

    // проходимся по массиву всех готовых тестов


    for(let readyTest of readyTests){
      let readyTestGroupName: string = readyTest.group;

      /// ищем в данных модели искомый тест
      loop:
      for(let originDataGroup of origin){
        if(originDataGroup.group === readyTestGroupName){
          for(let originTest of originDataGroup.tests){
            if(originTest.name === readyTest.name){

              // изменяем значание, если его еще нет
              if(originTest.result === ''){
                originTest.result = readyTest.result;

                if(originTest.result === 'success'){
                  originTest.testIcon = 'check';
                } else {
                  originTest.testIcon = 'error-standard';
                }


                console.log('test: ',originTest.name, ', result: ',readyTest.result);
                break loop;
              }

            }
          }

        }
      }

    }

    //console.log('in merge func: ', origin);
    return origin;

  }

}
