import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsnotLoggedUserGuard implements CanActivate {
  constructor(private _router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      if(!localStorage.getItem('token')){

        console.log("no token")
        this._router.navigateByUrl('/user/login')
        return false
      }
    return true;
  }
}