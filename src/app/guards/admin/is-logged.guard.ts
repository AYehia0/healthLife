import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsloggedAdminInGuard implements CanActivate {
  constructor(private _router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      if(localStorage.getItem('tokenAdmin')){
        this._router.navigateByUrl('')
        return false
      }
    return true;
  }
}