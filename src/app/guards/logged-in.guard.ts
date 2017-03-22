import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Injectable()
export class LoggedInGuard implements CanActivate {
  constructor(private router: Router, private user: UserService) { }

  canActivate() {

    console.log('rawr', this.user.isLoggedIn());

    return this.user.isLoggedIn().map((isLoggedIn) => {

      console.log('rawr', isLoggedIn);

      if (isLoggedIn) {
        return true;
      }

      this.router.navigate(['/sign-in']);

      return false;
    });

  }
}