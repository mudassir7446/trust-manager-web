import { AlertDialogComponent, AlertMessage } from './../alert-dialog/alert-dialog.component';
import { AughService } from '../services/auth.service';
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
  loginService: AughService;
  dialog: MatDialog;
  constructor(router: Router, loginService: AughService, dialog: MatDialog)
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
    if (!this.username || "" === this.username)
    {
      // username is blank
      this.showError("Username is empty");
      return false;
    }

    if (!this.password || "" === this.password)
    {
      // username is blank
      this.showError("Password is empty");
      return false;
    }

    this.loginService.login(this.username, this.password).then((user) =>
    {
      if (user.firstname)
      {
        this.router.navigate([''], { queryParams: {} });
      } else
      {
        this.showError("Invalid Username/Password");
      }
    }, (error: Error) =>
    {
      if (error)
        this.showError(error.message);
    });
    return false;
  }

  public showError(message: string)
  {
    this.dialog.open(AlertDialogComponent, {
      data: new AlertMessage(message, () =>
      {
        this.loginButtonEnabled = true;
        this.showProgressBar = false;
      })
    });
  }
}
