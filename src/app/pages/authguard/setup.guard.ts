import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SetupService } from './../service/setup.service';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard   {

  constructor(private setupService: SetupService, private router: Router) {}

  async canActivate() {
    const isSetup = await this.setupService.isUserSetup();

    if (!isSetup) {
      this.router.navigateByUrl('/setup');
      return false;
    }

    return true;
  }
}
