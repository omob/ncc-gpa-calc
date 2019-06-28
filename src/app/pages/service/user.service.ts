
import { Injectable } from '@angular/core';
import { UserLoginModel } from './../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private _isLogin = false;

  constructor() { }

  login(userInfo: UserLoginModel): Promise<ServerResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        this._isLogin = true;
        resolve({ success: true, message: 'Logged In'});
      }, 3000);
    });
  }

  logout() {

  }

  get isLogin () {
    return this._isLogin;
  }
}



export interface ServerResponse {
  success: boolean;
  message: string;
}
