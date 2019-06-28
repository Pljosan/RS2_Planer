import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate{

  constructor(public router: Router) { }

  canActivate(): boolean {
    console.log("can activate")
    if (sessionStorage.getItem("id") === null) {
      console.log("asdk");
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
