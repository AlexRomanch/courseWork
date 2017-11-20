import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {ClarityModule} from 'clarity-angular';
import {AppComponent} from './app.component';
import {RouterModule} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {MainComponent} from './main/main.component';
import {PersonalAccountComponent} from './main/personal-account/personal-account.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthGuard} from './guards/auth.guard';
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import {AccountService} from "./services/account.service";
import {TestPageComponent} from './main/test-page/test-page.component';
import {TestProcessService} from "./services/test-process.service";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {StopTestProcessGuard} from "./guards/stop-test-process.guard";
import {TestProcessWatcherService} from "./services/test-process-watcher.service";

const routes = [
  {path: '', component: LoginComponent},
  {path: 'login', component: LoginComponent},
  {path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      {path: 'personalAccount', component: PersonalAccountComponent},
      {path: 'testPage', component: TestPageComponent, canDeactivate: [StopTestProcessGuard]}
    ]
  }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    PersonalAccountComponent,
    TestPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ClarityModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, AuthService, AccountService, TestProcessService, StopTestProcessGuard, TestProcessWatcherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
