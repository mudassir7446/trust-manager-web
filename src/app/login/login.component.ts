import { AlertDialogComponent, AlertMessage } from './../alert-dialog/alert-dialog.component';
import { LoginService } from './../services/login.service';
import { MatInputModule } from '@angular/material/input';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { MatDialog } from '@angular/material/dialog';

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
  dialog: MatDialog;
  constructor(router: Router, loginService: LoginService, dialog: MatDialog)
  {
    this.router = router;
    this.loginService = loginService;
    this.dialog = dialog;
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
    this.loginService.login(this.username, this.password).then((user) =>
    {
      //TODO add validation for blank username/password
      if (user.firstname)
      {
        this.router.navigate([''], { queryParams: {} });
      } else
      {
        this.dialog.open(AlertDialogComponent, {
          data: new AlertMessage("Invalid Username/Password.", () =>
          {
            this.loginButtonEnabled = true;
            this.showProgressBar = false;
          })
        });
      }
    }, () =>
    {
      //TODO show error
      this.showProgressBar = false;
      this.loginButtonEnabled = true
    });
    return false;
  }
}
