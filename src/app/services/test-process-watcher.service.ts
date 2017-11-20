import { Injectable } from '@angular/core';
import {Cookie} from "ng2-cookies";

@Injectable()
export class TestProcessWatcherService {

  isProcessRunning(): boolean {
    return Cookie.check('processRun');
  }

  processRun(): void{
    Cookie.set("processRun", "1");
  }

  processEnded(): void {
    Cookie.delete('processRun');
  }
}
