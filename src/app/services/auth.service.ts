import { JwtToken } from './../models/jwt-token';
import jwt_decode from 'jwt-decode';
import { catchError } from 'rxjs/operators';
import { LoginResponse } from './../models/login-response';
import { environment } from './../../environments/environment.prod';
import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

const LOGIN_TOKEN_KEY: string = "loginToken";
const LOGIN_API_PATH: string = "/auth/basic/login";

@Injectable({
  providedIn: 'root'
})
export class AughService
{

  constructor(private httpClient: HttpClient) { }

  public checkLogin(): Promise<User>
  {
    let promise = new Promise<User>((resolve, reject) =>
    {
      let token = localStorage.getItem(LOGIN_TOKEN_KEY);
      let user = new User();
      if (token)
      {
        let jwtTokenDecode: JwtToken = jwt_decode(token);
        user.firstname = jwtTokenDecode.firstname;
        user.lastname = jwtTokenDecode.lastname;
        user.username = jwtTokenDecode.username;
      }
      resolve(user);
      ;
    });
    return promise;
  }

  public login(username: string, password: string): Promise<User>
  {
    return new Promise<User>((resolve, reject) =>
    {
      this.performLogin(username, password).then(user => resolve(user), reject);
    });
  }

  public logout(): Promise<void>
  {
    return new Promise<void>((resolve, reject) =>
    {
      //TODO invalidate the jwt token on server
      localStorage.removeItem(LOGIN_TOKEN_KEY);
      resolve();
    });
  }

  private performLogin(username: string, password: string): Promise<User>
  {
    // call server, parse response fetch user and save the token
    return new Promise<User>((resolve, reject) =>
    {
      let loginPromise = this;
      // call login server
      let payload = {
        username: username,
        password: password
      };
      this.httpClient.post<LoginResponse>(environment.baseTrustApiUrl + LOGIN_API_PATH, payload).subscribe(response =>
      {
        let jwtToken = response.accessToken;
        // dummy jwt token
        //TODO expect well formed token from backend
        jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiZmlyc3RuYW1lIjoiTXVkYXNzaXIiLCJsYXN0bmFtZSI6IlJlaG1hbiIsInVzZXJuYW1lIjoibXVkYXNzaXIiLCJpYXQiOjE1MTYyMzkwMjJ9.pSBMraYAuiSBaxtHxW4hjgztd7NjkZ0QryHi7NvyN9g"
        let jwtTokenDecode: JwtToken = jwt_decode(jwtToken);
        localStorage.setItem(LOGIN_TOKEN_KEY, jwtToken);
        let user = new User();
        user.firstname = jwtTokenDecode.firstname;
        user.lastname = jwtTokenDecode.lastname;
        user.username = jwtTokenDecode.username;
        resolve(user);
      }, (err: HttpErrorResponse) => this.handleLoginError(err, reject));
    })
  }

  private handleLoginError(errorResponse: HttpErrorResponse, errorCallback: Function): void
  {
    let message = "unknown error occured while login";
    errorResponse.status
    if (errorResponse.status === 401)
    {
      message = "Authentication failed. Invalid Username/Password";
    }
    if (errorCallback)
    {
      errorCallback(new Error(message));
    }
  }
}
