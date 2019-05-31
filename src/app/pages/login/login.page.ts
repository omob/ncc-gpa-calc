import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { UserService } from '../service/user.service';
import { UserLoginModel } from './login.model';
import { Router } from '@angular/router';
import { AuthService } from './../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  userLogin: UserLoginModel;

  constructor(
    private loadingCtrl: LoadingController,
    private userService: UserService,
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onForgotPassword() {

  }

  async onSignIn() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging in ...'
    });
    loading.present();

    const response = await this.userService.login(this.userLogin);
    loading.dismiss();

    if (response.success) {
      let url: string;
      //check if already setup
      this.authService.isUserSetup ? url = 'home' : url = 'setup';

      this.router.navigate(['/', url]);
    }
  }
}