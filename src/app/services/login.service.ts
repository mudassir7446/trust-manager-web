import { User } from './../models/user';
import { Injectable } from '@angular/core';

const LOGIN_TOKEN_KEY: string = "loginToken";

@Injectable({
  providedIn: 'root'
})
export class LoginService
{

  constructor() { }

  public checkLogin(): Promise<User>
  {
    let promise = new Promise<User>((resolve, reject) =>
    {
      setTimeout(() =>
      {
        let token = localStorage.getItem(LOGIN_TOKEN_KEY);
        let user = new User();
        if (token)
        {
          user.firstname = "Mudassir";
          user.lastname = "Rehman";
          user.username = "MdLogin";
        }
        resolve(user);
      }, 2000);
      ;
    });
    return promise;
  }

  public login(username: string, password: string): Promise<User>
  {
    return new Promise<User>((accept, reject) =>
    {
      setTimeout(() =>
      {
        let user = new User();
        if ("mudassir" === username)
        {
          //TODO call remote http service from here
          localStorage.setItem(LOGIN_TOKEN_KEY, "loginTokenValue");
          user.firstname = "Mudassir";
          user.lastname = "Rehman";
        }
        accept(user);
      }, 1000);
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
}
