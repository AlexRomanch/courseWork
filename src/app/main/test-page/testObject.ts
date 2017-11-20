export class TestObject{
  name: string;
  enable: boolean = true;
  result: string = '';
  group: string;

  testIcon;

  SUCCESS: string = 'success';
  FAILED: string = 'failed';

  // public successed(): boolean {
  //     return this.SUCCESS === this.result;
  // }
  //
  // public failed(): boolean {
  //   return this.FAILED === this.result;
  // }
}
