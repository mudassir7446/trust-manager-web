import { DoctorTableComponent } from './../doctor-table/doctor-table.component';
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
  smallDevice: boolean = false;
  xSmallDevice: boolean = false;
  //TODO make the organization name configurable
  constructor(breakpointOberver: BreakpointObserver, loginService: AughService, router: Router)
  {
    this.loginService = loginService;
    this.router = router;
    breakpointOberver.observe([Breakpoints.XSmall]).subscribe(result =>
    {
      if (result.matches)
      {
        this.orgNameClass = "hide-on-xsmall-device";
        this.xSmallDevice = true;
      } else
      {
        this.orgNameClass = "";
        this.xSmallDevice = false;
      }
    });
    breakpointOberver.observe([Breakpoints.XSmall, Breakpoints.Small]).subscribe(result =>
    {
      if (result.matches)
      {
        this.smallDevice = true;
      } else
      {
        this.smallDevice = false;
      }
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

  public showDoctors(): void
  {
    this.router.navigate(['./doctors'], {});
  }

  public showBeneficiaries(): void
  {
    this.router.navigate(['./beneficiaries'], {});
  }

  public showHospitals(): void
  {
    this.router.navigate(['./hospitals'], {});
  }

  public showCases(): void
  {
    this.router.navigate(['./cases'], {});
  }


  private showError(param: any): void
  {
    //TODO show error on login
    console.log("error");
  }
}
