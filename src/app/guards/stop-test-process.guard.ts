import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {TestProcessWatcherService} from "../services/test-process-watcher.service";

@Injectable()
export class StopTestProcessGuard implements CanDeactivate<any> {

  constructor(private processWatcher: TestProcessWatcherService){

  }
  canDeactivate(component: any, currentRoute: ActivatedRouteSnapshot, currentState: RouterStateSnapshot, nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.processWatcher.isProcessRunning()){
      console.log('processWatcher: process is running');
      return window.confirm("Are you sure? Test process will be interrupted.");
    }

    console.log('processWatcher: process NOT is running');
    return true;
  }

}
