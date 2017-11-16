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
  statusMessagePasswordChange: string;

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

      this.accountDataControl.get('userName').setValue(personalAccountData.name);
      this.accountDataControl.get('phone').setValue(personalAccountData.phone);
      this.accountDataControl.get('email').setValue(personalAccountData.email);
    });
  }

  validateEqualsPasswords(formControl: FormControl) {

    let val1 = formControl.get('newPassword').value;
    let val2 = formControl.get('repeatNewPassword').value;

    if (val1 !== val2) {
      return {validateEqualsPasswords: {message: 'passwords must be equals'}};
    } else {
      return null;
    }

  }

  changePassword(): void {
    if (!this.passwordChangeControl.valid) {
      return;
    }

    this.accountService.updatePassword(this.userId, this.passwordChangeControl.get('newPassword').value)
      .subscribe(
        response => {
          if (response.success) {
            this.statusMessagePasswordChange = 'Password successfully changed';
          } else {
            this.statusMessagePasswordChange = 'Failed to change password: ' + response.comments;
          }
        },
        error2 => {
          this.statusMessagePasswordChange = 'Server is unavailable';
        });
  }

  saveAccountData(): void {

    if (!this.accountDataControl.valid) {
      return;
    }

    this.personalAccountData.userId = this.userId;
    this.personalAccountData.name = this.accountDataControl.get('userName').value;
    this.personalAccountData.email = this.accountDataControl.get('email').value;
    this.personalAccountData.phone = this.accountDataControl.get('phone').value;

    this.accountService.updateAccountData(this.personalAccountData).subscribe(
      data => {
        if (data.success) {
          this.statusMessage = 'Changes saved';
        } else {
          this.statusMessage = 'Failed to save account information: ' + data.comments;
        }

      },
      error => {
        this.statusMessage = 'Server is unavailable. Data not saved'
      });
  }
}
