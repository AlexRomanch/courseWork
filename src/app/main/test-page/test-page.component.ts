import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-page',
  templateUrl: './test-page.component.html',
  styleUrls: ['./test-page.component.css']
})
export class TestPageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  selected: boolean = false;

  permissions: any = [
    {
      type: "Authenticated Users",
      expanded: true,
      rights: [
        {
          name: "Read",
          enable: true
        },
        {
          name: "Modify",
          enable: true
        },
        {
          name: "Create",
          enable: false
        },
        {
          name: "Delete",
          enable: false
        }
      ]
    },
    {
      type: "Owners",
      expanded: true,
      rights: [
        {
          name: "Read",
          enable: true
        },
        {
          name: "Modify",
          enable: true
        },
        {
          name: "Create",
          enable: true
        },
        {
          name: "Delete",
          enable: true
        }
      ]
    }
  ];
}
