import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ClarityModule} from 'clarity-angular';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import { PersonalAccountComponent } from './main/personal-account/personal-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";

const routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {path: 'personalAccount', component: PersonalAccountComponent}
    ]
  }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PersonalAccountComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
