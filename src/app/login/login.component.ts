import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginGroupControl: FormGroup;

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

    //console.log('login: ',login,', password: ', password);
    this.authService.authUser(login, password).subscribe(value => {
      console.log(value);
      if(value){
        console.log('inside value! ',value);
        this.router.navigate(['/main']);
      }
    });
  }

}
