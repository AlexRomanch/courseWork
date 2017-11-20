import {TestObject} from "./testObject";

export class TestGroup {
  group: string;
  expanded: boolean = false;
  tests: TestObject[] = [];

  addTest(test : TestObject): void {
    this.tests.push(test);
  }

  hasTests(): boolean {
    return this.tests.length > 0;
  }
}
