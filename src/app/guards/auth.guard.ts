import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {AuthService} from "../services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router,
              private authService: AuthService){ }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): | boolean {

    console.log('auth guard');

    if(this.authService.isAuth()){
      return true;
    }

    this.router.navigate(['/login']);

   return false;
  }
}
