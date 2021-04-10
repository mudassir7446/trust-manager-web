import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

const LOGIN_TOKEN_KEY = "loginToken";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate
{

  router: Router;
  constructor(router: Router)
  {
    this.router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {
    if (localStorage.getItem(LOGIN_TOKEN_KEY))
    {
      return true;
    }
    // no login information available
    this.router.navigate(['login'], {});
    return false;
  }

}
