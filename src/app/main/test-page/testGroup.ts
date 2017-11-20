import {TestObject} from "./testObject";

export class TestGroup {
  group: string;
  expanded: boolean = false;
  tests: TestObject[];
}
