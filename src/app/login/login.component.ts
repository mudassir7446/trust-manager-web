import { LoginService } from './../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit
{
  username: string = "";
  password: string = "";
  loginButtonEnabled: boolean = true;
  showProgressBar: boolean = false;

  router: Router;
  loginService: LoginService;
  constructor(router: Router, loginService: LoginService)
  {
    this.router = router;
    this.loginService = loginService;
  }

  ngOnInit(): void
  {
    console.log("inside login component");
  }

  /**
   * Method attempts login
   */
  public login(): boolean
  {
    this.loginButtonEnabled = false;
    this.showProgressBar = true;
    this.loginService.login().then((user) =>
    {
      this.router.navigate([''], { queryParams: {} });
    }, () =>
    {
      //TODO show error
      this.showProgressBar = false;
      this.loginButtonEnabled = true
    });
    return false;
  }
}
