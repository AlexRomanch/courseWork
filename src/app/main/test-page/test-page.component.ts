import { Component, OnInit } from '@angular/core';
import {TestProcessService} from "../../test-process.service";
import {TestGroup} from "./testGroup";

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  testTree: TestGroup[] = [];

  constructor(private testProcessService: TestProcessService) {
    testProcessService.getTests().subscribe(
      testTree => {
        console.log(testTree);
        this.testTree = testTree;
      }
    );
  }

  ngOnInit() {
  }
  selected: boolean = false;

  // testTreeOld: any = [
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
}
