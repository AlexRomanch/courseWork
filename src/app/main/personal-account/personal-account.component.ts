import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {el} from "@angular/platform-browser/testing/src/browser_util";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {

  passwordChangeControl: FormGroup;

  constructor() { }

  ngOnInit() {
    this.passwordChangeControl = new FormGroup({
      newPassword: new FormControl('',[Validators.required]),
      repeatNewPassword: new FormControl('',[Validators.required])
    }, this.validateEqualsPasswords);
  }

  validateEqualsPasswords(formControl: FormControl){
    console.log('validateEqualsPasswords!',formControl);

    let val1 = formControl.get('newPassword').value;
    let val2 = formControl.get('repeatNewPassword').value;

    if(val1 !== val2){
      console.log('failed');
      return {validateEqualsPasswords: {message: 'passwords must be equals'}};
    } else {
      console.log('ok');
      return null;
    }

  }

  changePassword(): void{
    console.log('submit password');
    if(!this.passwordChangeControl.valid){
      return;
    }
    console.log('submit password success!');

  }

  test2(): void{
    console.log('submit account data');
  }
}
