import { Component, OnInit } from '@angular/core';
import {TestProcessService} from "../../test-process.service";
import {TestGroup} from "./testGroup";
import {Observable} from 'rxjs/Rx';
import {TestObject} from "./testObject";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  selected: boolean = false;
  processInProgress: boolean = false;
  testTree: TestGroup[] = [];
  sessionId: number;

  constructor(private testProcessService: TestProcessService) {
  }

  ngOnInit() {
    this.testProcessService.getTests().subscribe(
      testTree => {
        //console.log(testTree);
        this.testTree = testTree;
      }
    );
    this.sessionId = null;
    this.processInProgress = false;
  }


  startTesting():void{
    this.testProcessService.startTestProcess(this.testTree).subscribe(sessionId => {
      if(sessionId){
        this.sessionId = sessionId;
        this.processInProgress = true;
        this.startPolling();
      }
    });
  }

  private startPolling() : void{
   // console.log('polling started!');

    let timer = Observable.timer(0, 1000);

    let subscription = timer.subscribe(t => {

      this.testProcessService.pollTestProcess(this.sessionId).subscribe( processInfo => {

       // console.log('polling: ',t);


        if(!processInfo.processAlive){
          //console.log('unsubscribe!');
          subscription.unsubscribe();
          this.processInProgress = false;
        }

        //console.log('merging: ',processInfo);
        this.testTree = this.testProcessService.mergeResults(this.testTree, processInfo.readyTests);
        //console.log(this.testTree);

      });
    });

  }

  getClass(testObj: TestObject): string{
    if(testObj.result === 'success'){
      return 'is-success is-solid';
    } else{
      return 'is-error is-solid';
    }
  }

  success(testObj: TestObject):boolean{
   // console.log(testObj);
    return 'success' === testObj.result;
  }

  public failed(testObj: TestObject): boolean {
  //  console.log('failed',testObj);
    return 'failed' === testObj.result;
  }
}
