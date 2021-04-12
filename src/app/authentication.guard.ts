import { AughService } from './services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate
{

  constructor(private router: Router, private loginService: AughService)
  {
    this.router = router;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree
  {

    let promise = new Promise<boolean>((resolve, reject) =>
    {
      this.loginService.checkLogin().then((user) =>
      {
        if (user.firstname)
        {
          resolve(true);
          return;
        }
        this.router.navigate(['login'], {});
        resolve(false);
      })
    });
    return promise;
  }

}
