import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class IsnotLoggedAdminGuard implements CanActivate {
  constructor(private _router: Router){ }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ): boolean {
      if(!localStorage.getItem('tokenAdmin')){
        this._router.navigateByUrl('/admin/login')
        return false
      }
    return true;
  }
}