import { AughService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit
{
  loginService: AughService;
  loggedIn = false;
  title = 'Trust Portal';
  orgName = 'Shifa-A-Rehmani';
  orgNameClass: string = "";
  ishaatIconClass: string = "";
  saviorIconClass: string = "";
  user: User = new User();
  router: Router;
  //TODO make the organization name configurable
  constructor(breakpointOberver: BreakpointObserver, loginService: AughService, router: Router)
  {
    this.loginService = loginService;
    this.router = router;
    breakpointOberver.observe([Breakpoints.XSmall]).subscribe(result =>
    {
      this.orgNameClass = result.matches ? "hide-on-xsmall-device" : "";
    });
    breakpointOberver.observe([Breakpoints.XSmall, Breakpoints.Small, Breakpoints.Medium]).subscribe(result =>
    {
      this.saviorIconClass = "small-device-icon";
      this.ishaatIconClass = "small-device-icon"
    });
  }

  ngOnInit(): void
  {
    // check login
    this.loginService.checkLogin().then((user) => { this.validateLogin(user); }, this.showError);
  }

  public logout(): boolean
  {
    this.loginService.logout().then(() => { this.logoutSuccessful() }, this.showError);
    return false;
  }

  private logoutSuccessful(): void
  {
    // logout successful , reload home,
    this.router.navigate(['login'], { queryParams: {} });
  }

  private validateLogin(user: User): void
  {
    if (!user.username)
    {
      // login check failed, redirect to login page
      this.loggedIn = false;
      this.router.navigate(['login'], { queryParams: {} });
    } else
    {
      // set the user profile and show the home page
      this.loggedIn = true;
      this.user = user;
    }
  }

  private showError(param: any): void
  {
    //TODO show error on login
    console.log("error");
  }
}
