
import { Injectable } from '@angular/core';
import { UserLoginModel } from './../login/login.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  login(userInfo: UserLoginModel): Promise<ServerResponse> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({ success: true, message: 'Logged In'});
      }, 3000);
    });
  }

  logout() {

  }
}



export interface ServerResponse {
  success: boolean;
  message: string;
}
