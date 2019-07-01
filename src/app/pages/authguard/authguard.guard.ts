import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SetupService } from './../service/setup.service';
import { UserService } from './../service/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (this.userService.isLogin) {
        return true;
      } else {
        this.router.navigateByUrl('/login');
        return false;
      }
  }
}
