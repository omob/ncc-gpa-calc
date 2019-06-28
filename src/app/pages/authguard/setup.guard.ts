import { Injectable } from '@angular/core';
import { Router, CanLoad } from '@angular/router';
import { SetupService } from './../service/setup.service';

@Injectable({
  providedIn: 'root'
})
export class SetupGuard  implements CanLoad {

  constructor(private setupService: SetupService, private router: Router) {}

  async canLoad() {
    const isSetup = await this.setupService.isUserSetup();
    if (!isSetup) {
      this.router.navigateByUrl('/setup');
      return false;
    }

    return true;
  }
}
