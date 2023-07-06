import { Injectable } from '@angular/core';

@Injectable()
export class CommonService {
  public APIUrl = 'http://16.171.148.224/api/data';
  public ticket =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2ODkyNzAxMDYsIkNMQUlNLTAxIjoieGhHaWwwaWVseGc9IiwiQ0xBSU0tMDIiOiI5UVx1MDAyQkxCb3dVOXprPSJ9.wTGl3rkFNh5WfbeTdpLRwtGQHLCi1xpdeMsL5d_EP-c';

  constructor() {}

  ShowMessage(message: string, d: number = 1000) {
    alert(message);
  }

  Handle_Exception(msg: any) {
    if (msg != null && msg !== '') {
      this.ShowMessage(msg, 3000);
    }
  }
}
