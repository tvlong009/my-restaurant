import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {UserLogin} from "../../model/userLogin.model";

@Injectable()
export class UserLoginProvider {
  private user: UserLogin;
  constructor(public http: Http) {
    this.user = {
      username: '',
      password: ''
    };
    console.log('Hello UserLoginProvider Provider');
  }
  setUser(username, password){
    this.user.username = username;
    this.user.password = password;
  }

  getUser(){
    return this.user;
  }

}
