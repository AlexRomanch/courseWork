import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccountService} from "../../services/account.service";
import {PersonalAccountData} from "./PersonalAccountData";

@Component({
  selector: 'app-personal-account',
  templateUrl: './personal-account.component.html',
  styleUrls: ['./personal-account.component.css']
})
export class PersonalAccountComponent implements OnInit {

  passwordChangeControl: FormGroup;
  accountDataControl: FormGroup;
  statusMessage: string;

  personalAccountData: PersonalAccountData = new PersonalAccountData();
  private userId: number = 0;

  constructor(private accountService: AccountService) {
  }

  ngOnInit() {
    this.passwordChangeControl = new FormGroup({
      newPassword: new FormControl('', [Validators.required]),
      repeatNewPassword: new FormControl('', [Validators.required])
    }, this.validateEqualsPasswords);

    this.accountDataControl = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
    });

    this.accountService.getPersonalAccountData(this.userId).subscribe(personalAccountData => {
      this.personalAccountData = personalAccountData;
      console.log('name: ', personalAccountData.name, ', email: ', personalAccountData.email, ', phone: ', personalAccountData.phone);

      this.accountDataControl.get('userName').setValue(personalAccountData.name);
      this.accountDataControl.get('phone').setValue(personalAccountData.phone);
      this.accountDataControl.get('email').setValue(personalAccountData.email);
    });
  }

  validateEqualsPasswords(formControl: FormControl) {
    console.log('validateEqualsPasswords!', formControl);

    let val1 = formControl.get('newPassword').value;
    let val2 = formControl.get('repeatNewPassword').value;

    if (val1 !== val2) {
      console.log('failed');
      return {validateEqualsPasswords: {message: 'passwords must be equals'}};
    } else {
      console.log('ok');
      return null;
    }

  }

  changePassword(): void {
    console.log('submit password');
    if (!this.passwordChangeControl.valid) {
      return;
    }
    console.log('submit password success!');

  }

  saveAccountData(): void {

    if (!this.accountDataControl.valid) {
      return;
    }
    console.log('submit account data');
    this.personalAccountData.userId = this.userId;
    this.personalAccountData.name = this.accountDataControl.get('userName').value;
    this.personalAccountData.email = this.accountDataControl.get('email').value;
    this.personalAccountData.phone = this.accountDataControl.get('phone').value;

    this.accountService.updateAccountData(this.personalAccountData).subscribe(
      data => {
        if(data.success){
          this.statusMessage = 'Changes saved';
        } else {
          this.statusMessage = 'Failed to save account information'
        }

      },
      error => {
        this.statusMessage = 'Server is unavailable. Data not saved'
      });
  }
}
