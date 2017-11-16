import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {Cookie} from "ng2-cookies";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroupControl: FormGroup;
  authFailedMsg : string;

  constructor(private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.loginGroupControl = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  login() : void{
    if(!this.loginGroupControl.valid){
      return;
    }

    let login: string = this.loginGroupControl.get('login').value;
    let password: string = this.loginGroupControl.get('password').value;

    this.authService.authUser(login, password).subscribe(
      authResponse => {

        if (authResponse.isAuth) {
          this.authFailedMsg = '';
          console.log('user id: ', authResponse.userId);
          this.router.navigate(['/main']);
        } else {
          this.authFailedMsg = 'Incorrect login/password'
        }

      },
      error => {
        this.authFailedMsg = 'Server is unavailable';
      });
  }

}
